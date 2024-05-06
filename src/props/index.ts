import { z } from "zod"
import {
  distance,
  rotation,
  layer_ref,
  supplier_name,
  resistance,
  capacitance,
  inductance,
} from "@tscircuit/soup"

export const relative_direction = z.enum([
  "top-to-bottom",
  "left-to-right",
  "bottom-to-top",
  "right-to-left",
])

export const common_layout_props = z.object({
  pcbX: distance.optional(),
  pcbY: distance.optional(),
  pcbRotation: rotation.optional(),
  schX: distance.optional(),
  schY: distance.optional(),
  schRotation: rotation.optional(),
  pcbLayer: layer_ref.optional(),
  footprint: z.string().optional(), // TODO pull in literals from @tscircuit/footprint
})

export const supplier_props = z.object({
  supplierPartNumbers: z.record(supplier_name, z.array(z.string())),
})

export const common_component_props = common_layout_props
  .merge(supplier_props)
  .extend({
    name: z.string(),
  })

export const resistor_props = common_component_props.extend({
  resistance,
})

export const capacitor_props = common_component_props.extend({
  capacitance,
})

export const inductor_props = common_component_props.extend({
  inductance,
})

export const diode_props = common_component_props.extend({})

export const led_props = common_component_props.extend({})

export const bug_props = common_component_props.extend({
  // portLabels:
  portArrangement: z.object({
    pins: z.array(z.number()),
    direction: z.union([
      z.literal("top-to-bottom"),
      z.literal("left-to-right"),
      z.literal("bottom-to-top"),
      z.literal("right-to-left"),
    ]),
  }),
})
