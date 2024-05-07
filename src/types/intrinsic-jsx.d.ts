import type * as B from "@tscircuit/builder"
import {
  SchematicPosition,
  PCBPosition,
  Dimension,
  Point,
  DimensionPoint,
  CommonLayout,
  RelativeDirection,
} from "./positions"
import type { LayoutBuilder } from "@tscircuit/layout"
import { ReactNode } from "react"
import type * as Props from "src/props"

type ExplicitPinSideDefinition = {
  pins: number[]
  direction?: RelativeDirection
}

interface PCBRouteHintPoint {
  x: string | number
  y: string | number
  via?: boolean
  via_to_layer?: string
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      resistor: Props.ResistorProps
      capacitor: Props.CapacitorProps
      inductor: Props.InductorProps
      diode: Props.DiodeProps
      led: Props.LedProps
      board: Props.BoardProps
      bug: Props.BugProps
    }
  }
}
