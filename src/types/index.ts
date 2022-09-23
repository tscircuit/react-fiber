import { AnyElement, GroupBuilder, ProjectBuilder } from "@tscircuit/builder"

export type RenderTreeRoot {
  renderToElements: (vnode: VNode) => Promise<AnyElement[]>
}

export type RenderContext = {
  projectBuilder: ProjectBuilder
  parentGroup: GroupBuilder
}

export type VNode = {
  type: string | Function
  props: Record<string, any>,
  children: Array<VNode>
}
