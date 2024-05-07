import { z } from "zod"
import { bug_props } from "src/props"
import { createUseComponentWithZod } from "./create-use-component-with-zod"

export function useBug<PN extends number, PL extends string>(
  name: string,
  props: Omit<z.input<typeof bug_props>, "name" | "pinLabels"> & {
    pinLabels: {
      [pinNum in PN]: PL
    }
  }
): React.ComponentType<
  Partial<
    Omit<z.input<typeof bug_props>, "name" | "pinLabels"> & {
      [K in PL | `pin${PN}`]: string
    }
  >
> & {
  [K in PL | `pin${PN}`]: string
} {
  return createUseComponentWithZod(
    "bug",
    bug_props,
    Object.keys(props.pinLabels)
      .map((pinNum) => `pin${pinNum}`)
      .concat(Object.values(props.pinLabels))
  )(name, bug_props as any) as any
}
