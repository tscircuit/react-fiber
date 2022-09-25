import { ProjectBuilder } from "@tscircuit/builder"
import { ReactNode } from "react"
import ReactReconciler, { Fiber, HostConfig } from "react-reconciler"

export type RootContainer = {}

export type Type = "resistor" | "custom"
export type Props = any
export type Container = any
export type Instance = any
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
    rootContainer.instances ??= []
    const instance = { type }
    rootContainer.instances.push(instance)
    return instance
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
  appendInitialChild(parent, child) {
    parent.children ??= []
    parent.children.push(child)
  },
  appendChild(parent, child) {
    parent.children ??= []
    parent.children.push(child)
  },
  finalizeInitialChildren(instance, type, props) {
    // NOTE: return true for commitMount
    return false
  },
  appendChildToContainer(container, child) {
    container.children ??= []
    container.children.push(child)
  },
  prepareUpdate(instance, type, oldProps, newProps) {
    return true
  },
  commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    instance.assign(updatePayload)
  },
  commitTextUpdate(textInstance, oldText, newText) {
    throw new Error("Text is not allowed in TSCircuit React")
  },
  removeChild(parentInstance, child) {
    parentInstance.children = parentInstance.children.filter((c) => c !== child)
  },
  prepareForCommit(containerInfo) {
    return null
  },
  resetAfterCommit(containerInfo) {},
  shouldSetTextContent(type, props) {
    return false
  },
  clearContainer(container) {
    container.children = []
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
    throw new Error("Function not implemented.")
  },
  supportsHydration: false,
}

export const createRoot = () => {
  return {
    async render(
      element: ReactNode,
      projectBuilder: ProjectBuilder & { _rootContainer: RootContainer },
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
