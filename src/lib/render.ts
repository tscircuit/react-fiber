import {
  BaseComponentBuilder,
  ComponentBuilder,
  createFootprintBuilder,
  createGroupBuilder,
  createProjectBuilder,
  createResistorBuilder,
  GroupBuilder,
  ProjectBuilder,
  TraceBuilder,
} from "@tscircuit/builder"
import { ReactNode, isValidElement } from "react"
import ReactReconciler, { Fiber, HostConfig } from "react-reconciler"
import {
  getBuilderForType,
  builderTypeToInitializer,
  BuilderType,
} from "./get-builder-for-type"
import { getSchematicPropertiesFromProps } from "./get-schematic-properties-from-props"
import { removeNils } from "src/utils/removeNils"
import { snakeCasePropsCompat } from "./snake-case-props-compat"
import { AnySoupElement } from "@tscircuit/soup"
import { createJSCADRenderer } from "jscad-fiber"
import { jscadPlanner } from "jscad-planner"

export type RootContainer = {}

export type Type = BuilderType | "custom"
export type Props = any
export type Container = GroupBuilder
export type Instance = ComponentBuilder | TraceBuilder | GroupBuilder
export type TextInstance = any
export type SuspenseInstance = any
export type HydratableInstance = any
export type PublicInstance = any
export type HostContext = any
export type UpdatePayload = any
export type ChildSet = any
export type TimeoutHandle = any
export type NoTimeout = any

export const hostConfig: HostConfig<
  Type,
  Props,
  Container,
  Instance,
  TextInstance,
  SuspenseInstance,
  HydratableInstance,
  PublicInstance,
  HostContext,
  UpdatePayload,
  ChildSet,
  TimeoutHandle,
  NoTimeout
> = {
  supportsMutation: true,
  createInstance(type, props, rootContainer, hostContext, internalHandle) {
    if (type === "custom") {
      if (!props.onAdd) {
        throw new Error(`<custom /> must provide an onAdd prop`)
      }
      const instance = createGroupBuilder(rootContainer.project_builder)
      props.onAdd(instance)
      return instance
    } else if (typeof type === "string") {
      const instance: any = getBuilderForType(
        type,
        rootContainer.project_builder,
      )

      props = snakeCasePropsCompat(type, props)

      let footprint = props.footprint
      if (props.footprint && Array.isArray(props.footprint)) {
        const fb = createFootprintBuilder(rootContainer.project_builder)
        ;(fb as any).createBuildContext =
          rootContainer.project_builder.createBuildContext
        fb.loadFootprintFromSoup(props.footprint)
        footprint = fb
      } else if (props.footprint && isValidElement(props.footprint)) {
        const fb = createFootprintBuilder(rootContainer.project_builder)
        ;(fb as any).createBuildContext =
          rootContainer.project_builder.createBuildContext
        createRoot().render(props.footprint, fb as any)
        footprint = fb
      }

      // Convert cadModel into jscad-planner json
      let cadModel = props.cadModel
      if (isValidElement(cadModel)) {
        // render cadModel to planner json
        if (cadModel.type === "jscad" || cadModel.type === "cad") {
          console.log("handling render")
          const renderer = createJSCADRenderer(jscadPlanner as any)
          const jscadElms: any[] = []
          const root = renderer.createJSCADRoot(jscadElms)
          root.render((cadModel as any).props.children)
          cadModel = jscadElms
        } else {
          throw new Error(
            `Unrecognized React component given as cadModel, must be "cad" or "jscad"`,
          )
        }
      }

      if ("setProps" in instance) {
        const propsWithElms = removeNils({
          ...props,
          footprint,
          cadModel,
        })
        ;(instance as any).setProps(propsWithElms)
        return instance
      }

      const propNames = Object.keys(props)
      for (const propName of propNames) {
        let capPropName = propName.charAt(0).toUpperCase() + propName.slice(1)

        if (capPropName === "Ftype") {
          capPropName = "FType"
        }

        const setter = (instance as any)[`set${capPropName}`]
        if (setter) {
          const isPositionProp = capPropName.endsWith("Center")

          if (isPositionProp) {
            setter.call(instance, ...props[propName])
          } else {
            setter.call(instance, props[propName])
          }
          continue
        }
      }

      const setSchPositionFn =
        instance.setPosition ?? instance.setSchematicCenter

      if (setSchPositionFn && (props.schX || props.schY)) {
        if (props.schX === undefined || props.schY === undefined) {
          throw new Error(
            "if defining schX, must also define schY and vice versa",
          )
        }
        ;(instance as any).setSchematicCenter(props.schX, props.schY)
      }

      // collect all the schematic properties together
      const schematic_properties = getSchematicPropertiesFromProps(props)

      if ("setSchematicProperties" in instance) {
        ;(instance as any).setSchematicProperties(schematic_properties)
      }

      if (schematic_properties.schematic_center) {
        if ("setSchematicCenter" in instance) {
          ;(instance as any).setSchematicCenter(
            schematic_properties.schematic_center.x,
            schematic_properties.schematic_center.y,
          )
        }
      }

      if (schematic_properties.schematic_rotation) {
        if ("setSchematicRotation" in instance) {
          ;(instance as any).setSchematicRotation(
            schematic_properties.schematic_rotation,
          )
        }
      }

      if ("footprint" in instance && (props.pcb_x || props.pcb_y)) {
        if (props.pcb_x === undefined || props.pcb_y === undefined) {
          throw new Error(
            "if defining pcb_x, must also define pcb_y and vice versa",
          )
        }
        ;(instance as any).footprint.setPosition(props.pcb_x, props.pcb_y)
      }

      if ("setSize" in instance && (props.width || props.height)) {
        if (props.width === undefined || props.height === undefined) {
          throw new Error(
            "if defining width, must also define height and vice versa",
          )
        }
        // ;(instance as any).setSize
      }

      return instance
    }

    throw new Error(`Couldn't handle type: "${type}"`)
  },
  getRootHostContext() {
    return null
  },
  getChildHostContext(parentHostContext, type, rootContainer) {
    return parentHostContext
  },
  createTextInstance() {
    throw new Error("Text is not allowed in TSCircuit React")
  },
  appendInitialChild(parent: any, child) {
    // throw new Error("appendInitialChild not implemented")
    parent.appendChild(child)
  },
  appendChild(parent, child) {
    throw new Error("appendChild not implemented")
  },
  finalizeInitialChildren(instance, type, props) {
    // NOTE: return true for commitMount
    return false
  },
  appendChildToContainer(container: any, child) {
    if (!("appendChild" in container)) {
      throw new Error(
        `Container "${container.builder_type}" does not support appending children`,
      )
    }
    container.appendChild(child)
  },
  prepareUpdate(instance, type, oldProps, newProps) {
    return true
  },
  commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    throw new Error("commitUpdate not implemented")
    // instance.assign(updatePayload)
  },
  commitTextUpdate(textInstance, oldText, newText) {
    throw new Error("Text is not allowed in TSCircuit React")
  },
  removeChild(parentInstance, child) {
    throw new Error("removeChild not implemented")
  },
  prepareForCommit(containerInfo) {
    return null
  },
  resetAfterCommit(containerInfo) {},
  shouldSetTextContent(type, props) {
    return false
  },
  clearContainer(container) {
    if (!container.reset) {
      console.warn(
        `CONTAINER IS MISSING RESET! Add to builder "${container.builder_type}"`,
      )
      return
    }
    container.reset()
  },
  supportsPersistence: false,
  getPublicInstance: function (instance: any) {
    throw new Error("Function not implemented.")
  },
  preparePortalMount: function (containerInfo: any): void {
    throw new Error("Function not implemented.")
  },
  scheduleTimeout: function (
    fn: (...args: unknown[]) => unknown,
    delay?: number | undefined,
  ) {
    throw new Error("Function not implemented.")
  },
  cancelTimeout: function (id: any): void {
    throw new Error("Function not implemented.")
  },
  noTimeout: undefined,
  isPrimaryRenderer: true,
  getCurrentEventPriority: function (): number {
    throw new Error("Function not implemented.")
  },
  getInstanceFromNode: function (node: any): Fiber | null | undefined {
    throw new Error("Function not implemented.")
  },
  beforeActiveInstanceBlur: function (): void {
    throw new Error("Function not implemented.")
  },
  afterActiveInstanceBlur: function (): void {
    throw new Error("Function not implemented.")
  },
  prepareScopeUpdate: function (scopeInstance: any, instance: any): void {
    throw new Error("Function not implemented.")
  },
  getInstanceFromScope: function (scopeInstance: any) {
    throw new Error("Function not implemented.")
  },
  detachDeletedInstance: function (node: any): void {
    // throw new Error("Function not implemented.")
  },
  supportsHydration: false,
}

export const createRoot = () => {
  return {
    render(
      element: ReactNode,
      projectBuilder: ProjectBuilder & { _rootContainer?: RootContainer },
      callback: null | (() => void) = null,
    ) {
      const container = {}
      const reconciler = ReactReconciler(hostConfig)

      if (!projectBuilder._rootContainer) {
        projectBuilder._rootContainer = reconciler.createContainer(
          projectBuilder as any,
          0,
          null,
          false,
          null,
          "tsci",
          (error: Error) => {
            console.error("got recoverable error from reconciler...", error)
          },
          null,
        )
      }
      reconciler.updateContainer(
        element,
        projectBuilder._rootContainer,
        null,
        callback,
      )
      return projectBuilder.build(
        projectBuilder.createBuildContext(),
      ) as any as Promise<AnySoupElement[]>
    },
  }
}
