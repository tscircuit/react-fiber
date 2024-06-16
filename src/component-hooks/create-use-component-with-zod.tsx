import React, { Component, ComponentProps } from "react"
import { z } from "zod"
import { resistorProps, resistorPins } from "@tscircuit/props"

export const createUseComponentWithZod = <
  PrD extends z.ZodObject<any, any, any>,
  PiD extends string
>(
  Component: React.ComponentType<any> | string,
  propsDef: PrD,
  pins: readonly PiD[]
) => {
  return <T extends Omit<z.input<PrD>, "name"> | undefined = undefined>(
    name: string,
    props?: T
  ): React.ComponentType<
    (T extends undefined
      ? Omit<z.input<PrD>, "name">
      : Omit<Partial<z.input<PrD>>, "name">) & {
      [key in typeof pins[number]]?: string
    }
  > & {
    [key in typeof pins[number]]: string
  } => {
    const R: any = (props2: any) => {
      // TODO - currently this converts some props to strings but loses some
      // nice data included with the strings, e.g. `10kohm` becomes 10000,
      // which is fine except we'd like to display it as the user specified it
      // const combinedProps = propsDef.parse({ ...props, ...props2, name })
      const combinedProps = { ...props, ...props2, name }
      const tracesToCreate: any[] = []
      for (const portLabel of pins) {
        if (combinedProps[portLabel]) {
          const from = `.${name} > .${portLabel}`
          const to = combinedProps[portLabel]
          tracesToCreate.push({ from, to })
          delete combinedProps[portLabel]
        }
      }

      return (
        <>
          <Component {...combinedProps} />
          {tracesToCreate.map((trace, i) => (
            <trace key={i} {...trace} />
          ))}
        </>
      )
    }
    for (const port of pins) {
      R[port] = `.${name} > .${port}`
    }

    return R
  }
}
