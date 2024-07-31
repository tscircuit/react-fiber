import { z } from "zod"
import { bugProps } from "@tscircuit/props"
import { createUseComponentWithZod } from "./create-use-component-with-zod"

/**
 * @deprecated This function is deprecated and will be removed in a future version.
 * Please use the updated version or an alternative function.
 */
export function useBug<PN extends number, PL extends string>(
  name: string,
  props: Omit<z.input<typeof bugProps>, "name" | "pinLabels"> & {
    pinLabels: {
      [pinNum in PN]: PL
    }
  }
): React.ComponentType<
  Partial<
    Omit<z.input<typeof bugProps>, "name" | "pinLabels"> & {
      [K in PL | `pin${PN}`]: string
    }
  >
> & {
  [K in PL | `pin${PN}`]: string
} {
  return createUseComponentWithZod(
    "bug",
    bugProps,
    Object.keys(props.pinLabels)
      .map((pinNum) => `pin${pinNum}`)
      .concat(Object.values(props.pinLabels))
  )(name, props) as any
}