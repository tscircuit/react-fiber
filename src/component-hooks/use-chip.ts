import type { z } from "zod"
import { bugProps as chipProps } from "@tscircuit/props"
import { createUseComponentWithZod } from "./create-use-component-with-zod"

export function useChip<PN extends number, PL extends string>(
  name: string,
  props: Omit<z.input<typeof chipProps>, "name" | "pinLabels"> & {
    pinLabels: {
      [pinNum in PN]: PL
    }
  },
): React.ComponentType<
  Partial<
    Omit<z.input<typeof chipProps>, "name" | "pinLabels"> & {
      [K in PL | `pin${PN}`]: string
    }
  >
> & {
  [K in PL | `pin${PN}`]: string
} {
  return createUseComponentWithZod(
    "chip",
    chipProps,
    Object.keys(props.pinLabels)
      .map((pinNum) => `pin${pinNum}`)
      .concat(Object.values(props.pinLabels)),
  )(name, props) as any
}
