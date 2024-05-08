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
      powersource: Props.PowerSourceProps
      ground: Props.GroundProps
      via: Props.ViaProps
      schematicbox: Props.SchematicBoxProps
      schematicline: Props.SchematicLineProps
      schematicpath: Props.SchematicPathProps
      schematictext: Props.SchematicTextProps
      smtpad: Props.SmtPadProps
      platedhole: Props.PlatedHoleProps
      hole: Props.HoleProps
      port: Props.PortProps
      group: Props.GroupProps
      netalias: Props.NetAliasProps
      custom: any
      component: Props.ComponentProps
      footprint: any
    }
  }
}
