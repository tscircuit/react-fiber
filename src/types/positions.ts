import type * as B from "@tscircuit/builder"
import { ReactElement } from "react"

export type Dimension = number | string
export type Point = [number, number] | { x: number; y: number }
export type DimensionPoint =
  | [Dimension, Dimension]
  | { x: Dimension; y: Dimension }

export interface SchematicPosition {
  center?: Point
  x?: Dimension
  y?: Dimension
  cx?: Dimension
  cy?: Dimension
  sch_x?: Dimension
  sch_y?: Dimension
  sch_cx?: Dimension
  sch_cy?: Dimension
  sch_center?: Point
  sch_rotation?: string | number
  rotation?: string | number
}

export interface PCBPosition {
  center?: Point
  pcb_x?: Dimension
  pcb_y?: Dimension
  x?: Dimension
  y?: Dimension
  pcb_cx?: Dimension
  pcb_cy?: Dimension
  pcb_rotation?: string | number
  footprint?: B.StandardFootprint | ReactElement
  pcb_layer?: B.LayerRef
}

export interface BomProps {
  supplier_part_numbers?: Partial<Record<B.SupplierName, string[] | string>>
}

const a: PCBPosition = {
  pcb_layer: "top",
}

export type RelativeDirection =
  | "top-to-bottom"
  | "left-to-right"
  | "bottom-to-top"
  | "right-to-left"

export interface CommonLayout
  extends SchematicPosition,
    PCBPosition,
    BomProps {}
