import { z } from "zod"
import { distance, rotation } from "@tscircuit/soup"
import { layer_ref } from "@tscircuit/builder"

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

export const supplier_props = z.object({})

export const resistor_props = common_layout_props.extend({
  name: z.string(),
  resistance: z.string(),
})

export const capacitor_props = z.object({})
