import { AnyElement, GroupBuilder, ProjectBuilder } from "@tscircuit/builder"

export type { StandardFootprint } from "@tscircuit/builder"

export type RenderTreeRoot = {
  renderToElements: (vnode: VNode) => Promise<AnyElement[]>
}

export type RenderContext = {
  projectBuilder: ProjectBuilder
  parentGroup: GroupBuilder
}

export type VNode = {
  // e.g. Symbol(react.element)
  $$typeof: symbol

  type: string | ((props: Record<string, any>) => VNode | VNode[] | null)
  props: Record<string, any> & {
    children: VNode | VNode[] | null
  }

  key: null | string
  ref: null | any

  _owner: any
  _store: any
}
