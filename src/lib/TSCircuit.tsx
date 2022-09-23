import { ResistorBuilder } from "@tscircuit/builder"
import { VNode } from "types"

export const createVNode = (
  type: string | Function,
  props: any,
  children: any
): VNode => {
  return { type, props: props ?? {}, children: children ?? [] }
}

export default createVNode
