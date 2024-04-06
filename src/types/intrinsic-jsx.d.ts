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
      resistor: {
        name: string
        resistance: Dimension
        children?: any
      } & CommonLayout
      custom: any
      capacitor: {
        name: string
        capacitance: Dimension
        children?: any
      } & CommonLayout
      inductor: Parameters<B.InductorBuilder["setSourceProperties"]>[0] &
        CommonLayout & { children?: any }
      diode: { name: string } & CommonLayout
      led: { name: string; color?: string } & CommonLayout
      bug: Omit<
        Parameters<B.BugBuilder["setSourceProperties"]>[0],
        "footprint"
      > &
        CommonLayout & {
          port_arrangement?:
            | {
                left_size?: number
                top_size?: number
                right_size?: number
                bottom_size?: number
              }
            | {
                left_side?: ExplicitPinSideDefinition
                right_side?: ExplicitPinSideDefinition
                top_side?: ExplicitPinSideDefinition
                bottom_side?: ExplicitPinSideDefinition
              }
          port_labels?: {
            [number]: string
          }
        } & { footprint?: any; children?: any }
      via: {
        name: string
        x: Dimension
        y: Dimension
        pcb_x: Dimension
        pcb_y: Dimension
        hole_diameter?: Dimension
        outer_diameter?: Dimension
        from_layer: B.LayerRef
        to_layer: B.LayerRef
      }
      netalias: Parameters<B.NetAliasBuilder["setSourceProperties"]>[0] &
        CommonLayout & { children?: any }
      ground: Parameters<B.GroundBuilder["setSourceProperties"]>[0] &
        CommonLayout & { children?: any }
      powersource: Parameters<B.PowerSourceBuilder["setSourceProperties"]>[0] &
        CommonLayout & { children?: any }
      group: Parameters<B.GroupBuilder["setSourceProperties"]>[0] &
        CommonLayout & { children?: any }
      trace:
        | {
            path: string[]
            schematic_route_hints?: DimensionPoint[]
            pcb_route_hints?: PCBRouteHintPoint[]
          }
        | {
            from: string
            to: string
            schematic_route_hints?: DimensionPoint[]
            pcb_route_hints?: PCBRouteHintPoint[]
          }
      smtpad: {
        shape: "circle" | "rect"
        x: Dimension
        y: Dimension
        layer?: string
        radius?: string
        width?: Dimension
        height?: Dimension
        port_hints?: string[]
        // size?: { width: number | string; height: number | string }
      } & PCBPosition
      port: {
        name: string
        direction?: string
        pin_number?: number
        dir?: string
        x: Dimension
        y: Dimension
      } & CommonLayout
      ports: Parameters<B.PortsBuilder["setSourceProperties"]>[0] & CommonLayout
      footprint: {} // just has children
      component: Parameters<
        B.GenericComponentBuilder["setSourceProperties"]
      >[0] & { children: any } & CommonLayout
      platedhole: Omit<
        Parameters<B.PlatedHoleBuilder["setProps"]>[0],
        "hole_diameter" | "inner_diameter" | "outer_diameter" | "x" | "y"
      > &
        PCBPosition & {
          port_hints?: string[]
          hole_diameter?: Dimension
          inner_diameter?: Dimension
          outer_diameter?: Dimension
        }
      hole: Partial<Omit<B.PCBHole, "type">> & PCBPosition
      schematicdrawing: {} // just has children

      // box can be used for pcb silkscreen too... maybe remove?
      box: Parameters<B.SchematicBoxBuilder["setProps"]>[0] & CommonLayout
      schematicbox: Parameters<B.SchematicBoxBuilder["setProps"]>[0] &
        SchematicPosition
      constraint: Parameters<B.ConstraintBuilder["setProps"]>[0]
      contrainedlayout: Parameters<B.ConstrainedLayoutBuilder["setProps"]>[0]

      // "line" conflicts w/ svg
      sline: Parameters<B.SchematicLineBuilder["setProps"]>[0] &
        SchematicPosition
      schematicline: Parameters<B.SchematicLineBuilder["setProps"]>[0] &
        SchematicPosition
      schematictext: {
        text: string
        x?: Dimension
        y?: Dimension
        position?: Point
      }
      schematicpath: {
        points: DimensionPoint[]
        is_filled?: boolean
        fill_color?: "blue" | "red"
      }
    }
  }
}

// TODO
export interface ComponentParameterMap {}
