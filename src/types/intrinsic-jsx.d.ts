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
import type * as LegacyProps from "src/props"
import type * as Props from "@tscircuit/props"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      resistor: LegacyProps.ResistorProps
      capacitor: LegacyProps.CapacitorProps
      inductor: LegacyProps.InductorProps
      diode: LegacyProps.DiodeProps
      led: LegacyProps.LedProps
      board: LegacyProps.BoardProps
      bug: LegacyProps.BugProps
      powersource: LegacyProps.PowerSourceProps
      ground: LegacyProps.GroundProps
      via: LegacyProps.ViaProps
      schematicbox: LegacyProps.SchematicBoxProps
      schematicline: LegacyProps.SchematicLineProps
      schematicpath: LegacyProps.SchematicPathProps
      schematictext: LegacyProps.SchematicTextProps
      smtpad: LegacyProps.SmtPadProps
      platedhole: LegacyProps.PlatedHoleProps
      hole: LegacyProps.HoleProps
      port: LegacyProps.PortProps
      group: LegacyProps.GroupProps
      netalias: LegacyProps.NetAliasProps
      trace: LegacyProps.TraceProps
      custom: any
      component: LegacyProps.ComponentProps
      footprint: any
      silkscreentext: Props.SilkscreenTextProps
      silkscreenpath: Props.SilkscreenPathProps
      silkscreenline: Props.SilkscreenLineProps
      silkscreenrect: Props.SilkscreenRectProps
      silkscreencircle: Props.SilkscreenCircleProps
      tracehint: LegacyProps.TraceHintProps
    }
  }
}
