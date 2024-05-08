import React, { Component, ComponentProps } from "react"
import { z } from "zod"
import { resistorProps, resistorPins } from "../props"

export const createUseComponent = <
  C extends React.ComponentType<any>,
  PiD extends string
>(
  Component: C,
  pins: readonly PiD[]
) => {
  return <T extends Omit<ComponentProps<C>, "name"> | undefined = undefined>(
    name: string,
    props?: T
  ): React.ComponentType<
    (T extends undefined
      ? Omit<ComponentProps<C>, "name">
      : Omit<Partial<ComponentProps<C>>, "name">) & {
      [key in typeof pins[number]]?: string
    }
  > & {
    [key in typeof pins[number]]: string
  } => {
    const R: any = (props2: any) => {
      props2.name = name
      const combinedProps = propsDef.parse({ ...props, ...props2 })
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
