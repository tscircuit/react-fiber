import React, { Component, ComponentProps } from "react"
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

export const createUseComponentWithZod = <
  PrD extends z.ZodObject<any, any, any>,
  PiD extends string
>(
  Component: React.ComponentType<any> | string,
  propsDef: PrD,
  pins: readonly PiD[]
) => {
  return <
    T extends Omit<ComponentProps<Component>, "name"> | undefined = undefined
  >(
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

const useResistor2 = createUseComponentWithZod(
  "resistor",
  resistor_props,
  resistor_pins
)

const SomeComponent = (props: { name: string; someprop: number }) => {
  return <resistor resistance={props.someprop} name={props.name} />
}

const useResistor3 = createUseComponent(SomeComponent, ["left", "right"])

const MyCircuit = () => {
  const R1 = useResistor("R1", { resistance: "10k" })
  const R2 = useResistor2("R2", { resistance: "1k" })
  const R3 = useResistor3("R3", { someprop: 1000 })

  return (
    <board width="100mm" height="100mm">
      <R1 />
      <R2 left={R1.left} />
      <R3 left={R2.left} />
    </board>
  )
}
