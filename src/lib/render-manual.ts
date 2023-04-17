import { AnyElement, createProjectBuilder } from "@tscircuit/builder"
import { RenderTreeRoot, VNode, RenderContext } from "types/index"

export const createRoot = (): RenderTreeRoot => {
  return {
    renderToElements: async (vnode: VNode) => {
      const projectBuilder = createProjectBuilder()
      const context: RenderContext = {
        projectBuilder,
        parentGroup: projectBuilder,
      }
      await renderVNode(context, vnode)
      return projectBuilder.build()
    },
  }
}

export const renderVNodes = async (
  context: RenderContext,
  vnodes: VNode | VNode[] | null
) => {
  if (!vnodes) return []
  if (typeof vnodes === "string") throw new Error("string is not a valid vnode")
  if (Array.isArray(vnodes)) {
    for (const vnode of vnodes) {
      renderVNode(context, vnode)
    }
    return
  } else {
    renderVNode(context, vnodes)
    return
  }
  throw new Error("couldn't render vnode")
}

export const renderVNode = async (
  context: RenderContext,
  vnode: VNode
): Promise<void> => {
  if (vnode.type === "resistor") {
    context.parentGroup.addResistor((rb) => {
      if (vnode.props.name) rb.setName(vnode.props.name)
    })
    return
  } else if (vnode.type === "custom") {
    if (!vnode.props.onRender)
      throw new Error("<custom /> components must define onRender")
    await vnode.props.onRender(context.parentGroup)
    return
  }

  if (typeof vnode.type === "function") {
    renderVNodes(context, await vnode.type(vnode.props))
    return
  }

  throw new Error("Unknown vnode type: " + vnode.type)
}
