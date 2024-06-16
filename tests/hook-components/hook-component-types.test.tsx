import React from "react"
import test from "ava"
import {
  createUseComponent,
  createUseComponentWithZod,
  useResistor,
} from "src/component-hooks"
import { resistorPins, resistorProps } from "@tscircuit/props"

const SomeComponent = (props: { name: string; someprop: number }) => {
  return <resistor resistance={props.someprop} name={props.name} />
}

const useResistor2 = createUseComponentWithZod(
  "resistor",
  resistorProps,
  resistorPins
)
const useResistor3 = createUseComponent(SomeComponent, ["left", "right"])

test("different constructors of useResistor", (t) => {
  const R1 = useResistor("R1", { resistance: "10k" })
  const R2 = useResistor2("R2", { resistance: "1k" })
  const R3 = useResistor3("R3", { someprop: 1000 })

  const comp = (
    <board width="100mm" height="100mm">
      <R1 />
      <R2 left={R1.left} />
      <R3 left={R2.left} />
    </board>
  )

  t.is(R1.left, ".R1 > .left")
  t.is(R2.left, ".R2 > .left")
  t.is(R3.left, ".R3 > .left")

  t.pass()
})
