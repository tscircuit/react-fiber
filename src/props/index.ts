import { z } from "zod"
import {
  distance,
  rotation,
  layer_ref,
  supplier_name,
  resistance,
  capacitance,
  inductance,
  point,
} from "@tscircuit/soup"
import { ReactElement, ReactNode } from "react"
import { pcb_route_hint, StandardFootprint } from "@tscircuit/builder"

export const relative_direction = z.enum([
  "top-to-bottom",
  "left-to-right",
  "bottom-to-top",
  "right-to-left",
])

export const explicit_pin_side_definition = z.object({
  pins: z.array(z.number()),
  direction: z.union([
    z.literal("top-to-bottom"),
    z.literal("left-to-right"),
    z.literal("bottom-to-top"),
    z.literal("right-to-left"),
  ]),
})

export type Footprint = StandardFootprint | ReactElement
export const pcb_layout_props = z.object({
  pcbX: distance,
  pcbY: distance,
  pcbRotation: rotation,
  layer: layer_ref,
})
export const common_layout_props = z.object({
  pcbX: distance.optional(),
  pcbY: distance.optional(),
  pcbRotation: rotation.optional(),
  schX: distance.optional(),
  schY: distance.optional(),
  schRotation: rotation.optional(),
  layer: layer_ref.optional(),

  // TODO pull in literals from @tscircuit/footprint
  // TODO footprint can be a string or react child
  footprint: z.custom<Footprint>((v) => true).optional(),
})
export type CommonLayoutProps = z.input<typeof common_layout_props>

export const supplier_props = z.object({
  supplierPartNumbers: z.record(supplier_name, z.array(z.string())).optional(),
})
export type SupplierProps = z.input<typeof supplier_props>

export const common_component_props = common_layout_props
  .merge(supplier_props)
  .extend({
    name: z.string(),
  })
export type CommonComponentProps = z.input<typeof common_component_props>

export const lr_pins = ["pin1", "left", "pin2", "right"] as const
export const lr_polar_pins = [
  "pin1",
  "left",
  "anode",
  "pos",
  "pin2",
  "right",
  "cathode",
  "neg",
] as const

export const resistor_props = common_component_props.extend({
  resistance,
})
export const resistor_pins = lr_pins
export type ResistorProps = z.input<typeof resistor_props>

export const capacitor_props = common_component_props.extend({
  capacitance,
})
export const capacitor_pins = lr_polar_pins
export type CapacitorProps = z.input<typeof capacitor_props>

export const inductor_props = common_component_props.extend({
  inductance,
})
export const inductor_pins = lr_pins
export type InductorProps = z.input<typeof inductor_props>

export const diode_props = common_component_props.extend({})
export const diode_pins = lr_polar_pins
export type DiodeProps = z.input<typeof diode_props>

export const led_props = common_component_props.extend({})
export const led_pins = lr_polar_pins
export type LedProps = z.input<typeof led_props>

export const board_props = z.object({
  width: distance,
  height: distance,
  pcbCenterX: distance.optional().default(0),
  pcbCenterY: distance.optional().default(0),
  layout: z.any().optional(),
})
export type BoardProps = z.input<typeof board_props>

export const bug_props = common_component_props.extend({
  pinLabels: z.record(z.number(), z.string()),
  schPortArrangement: z
    .object({
      leftSize: z.number().optional(),
      topSize: z.number().optional(),
      rightSize: z.number().optional(),
      bottomSize: z.number().optional(),
    })
    .or(
      z.object({
        leftSide: explicit_pin_side_definition.optional(),
        rightSide: explicit_pin_side_definition.optional(),
        topSide: explicit_pin_side_definition.optional(),
        bottomSide: explicit_pin_side_definition.optional(),
      })
    ),
})
export type BugProps = z.input<typeof bug_props>

export const via_props = common_layout_props.extend({
  fromLayer: layer_ref,
  toLayer: layer_ref,
  hole_diameter: distance,
  outer_diameter: distance,
})
export type ViaProps = z.input<typeof via_props>

export const net_alias_props = common_layout_props.extend({
  net: z.string().optional(),
})
export type NetAliasProps = z.input<typeof net_alias_props>

export const trace_props = z
  .object({
    path: z.array(z.string()),
    thickness: distance.optional(),
    schematicRouteHints: z.array(point).optional(),
    pcbRouteHints: z.array(pcb_route_hint).optional(),
  })
  .or(
    z.object({
      from: z.string(),
      to: z.string(),
      thickness: distance.optional(),
      schematicRouteHints: z.array(point).optional(),
      pcbRouteHints: z.array(pcb_route_hint).optional(),
    })
  )
export type TraceProps = z.input<typeof trace_props>

export const smt_pad_props = z.union([
  pcb_layout_props.omit({ pcbRotation: true }).extend({
    shape: z.literal("circle"),
    radius: distance.optional(),
    portHints: z.array(z.string()).optional(),
  }),
  pcb_layout_props.omit({ pcbRotation: true }).extend({
    shape: z.literal("rect"),
    width: distance.optional(),
    height: distance.optional(),
    portHints: z.array(z.string()).optional(),
  }),
])
export type SmtPadProps = z.input<typeof smt_pad_props>
