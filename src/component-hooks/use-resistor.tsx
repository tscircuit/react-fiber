import React from "react"
import { z } from "zod"
import { resistor_props, resistor_pins } from "../props"

export const useResistor = <
  T extends Omit<z.input<typeof resistor_props>, "name"> | undefined = undefined
>(
  name: string,
  props?: T
): React.ComponentType<
  (T extends undefined
    ? Omit<z.input<typeof resistor_props>, "name">
    : Omit<Partial<z.input<typeof resistor_props>>, "name">) & {
    [key in typeof resistor_pins[number]]?: string
  }
> & {
  [key in typeof resistor_pins[number]]: string
} => {
  const R: any = (props2: z.input<typeof resistor_props>) => {
    const combinedProps = { ...props, ...props2 }
    combinedProps.name = name
    const tracesToCreate: any[] = []
    for (const portLabel of resistor_pins) {
      if (combinedProps[portLabel]) {
        const from = `.${name} > .${portLabel}`
        const to = combinedProps[portLabel]
        tracesToCreate.push({ from, to })
        delete combinedProps[portLabel]
      }
    }

    return (
      <>
        <resistor {...combinedProps} />
        {tracesToCreate.map((trace, i) => (
          <trace key={i} {...trace} />
        ))}
      </>
    )
  }
  for (const port of resistor_pins) {
    R[port] = `.${name} > .${port}`
  }

  return R
}

const MyCircuit = () => {
  const R1 = useResistor("R1", { resistance: "10k" })
  const R2 = useResistor("R2", { resistance: "1k" })

  return (
    <board width="100mm" height="100mm">
      <R1 />
      <R2 left={R1.left} />
    </board>
  )
}
