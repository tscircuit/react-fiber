import { AnyElement, createProjectBuilder } from "@tscircuit/builder"
import { RenderTreeRoot, VNode, RenderContext } from "types"

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

export const renderVNode = async (
  context: RenderContext,
  vnode: VNode
): Promise<void> => {
  if (vnode.type === "resistor") {
    context.parentGroup.addResistor((rb) => {
      if (vnode.props.name) rb.setName(vnode.props.name)
    })
  }
}
