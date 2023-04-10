import {
  BaseComponentBuilder,
  ComponentBuilder,
  createGroupBuilder,
  createResistorBuilder,
  GroupBuilder,
  ProjectBuilder,
  TraceBuilder,
} from "@tscircuit/builder"
import { ReactNode } from "react"
import ReactReconciler, { Fiber, HostConfig } from "react-reconciler"
import {
  getBuilderForType,
  builderTypeToInitializer,
  BuilderType,
} from "./get-builder-for-type"

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
      const instance = getBuilderForType(type, rootContainer.project_builder)

      if ("setProps" in instance) {
        ;(instance as any).setProps(props)
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
          setter.call(instance, props[propName])
          continue
        }
      }

      if ("setPosition" in instance && (props.x || props.y)) {
        if (props.x === undefined || props.y === undefined) {
          throw new Error("if defining x, must also define y and vice versa")
        }
        ;(instance as any).setPosition(props.x, props.y)
      }

      if ("setSchematicCenter" in instance && (props.x || props.y)) {
        if (props.x === undefined || props.y === undefined) {
          throw new Error("if defining x, must also define y and vice versa")
        }
        ;(instance as any).setSchematicCenter(props.x, props.y)
      }

      if ("setSize" in instance && (props.width || props.height)) {
        if (props.width === undefined || props.height === undefined) {
          throw new Error(
            "if defining width, must also define height and vice versa"
          )
        }
      }

      return instance
    }

    throw new Error(`Couldn't handle type: "${type}"`)
  },
  getRootHostContext() {
    return {}
  },
  getChildHostContext() {
    return {}
  },
  createTextInstance() {
    throw new Error("Text is not allowed in TSCircuit React")
  },
  appendInitialChild(parent: any, child) {
    // throw new Error("appendInitialChild not implemented")
    // console.log(child.build())
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
        `Container "${container.builder_type}" does not support appending children`
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
    delay?: number | undefined
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
    async render(
      element: ReactNode,
      projectBuilder: ProjectBuilder & { _rootContainer?: RootContainer },
      callback: null | (() => void) = null
    ) {
      const container = {}
      const reconciler = ReactReconciler(hostConfig)
      if (!projectBuilder._rootContainer) {
        projectBuilder._rootContainer = reconciler.createContainer(
          projectBuilder,
          0,
          null,
          false,
          null,
          "tsci",
          (error: Error) => {
            console.error("got recoverable error from reconciler...", error)
          },
          null
        )
      }
      reconciler.updateContainer(
        element,
        projectBuilder._rootContainer,
        null,
        callback
      )
      return projectBuilder.build()
    },
  }
}
