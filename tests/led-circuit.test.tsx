import React from "react"
import test from "ava"
import { createRoot } from "lib/render"
import { createProjectBuilder } from "@tscircuit/builder"
import { logLayout } from "./utils/log-layout"
import "types/intrinsic-jsx"

const Resistor = () => (
  <component>
    <platedhole x={0} y={0} hole_diameter="1mm" outer_diameter="2mm" />
    <platedhole x="0.2in" y={0} hole_diameter="1mm" outer_diameter="2mm" />
    <box x="1.5mm" y={0} width="2.5mm" height="3mm" />
    <line x1="0mm" y1="0mm" x2="3mm" y2="0mm" />
    <port name="l" x="0mm" y="0mm" dir="left" />
    <port name="r" x="3mm" y="0mm" dir="right" />
  </component>
)

const Led = () => (
  <component x="5mm" y="0mm" pcb_y="4mm" pcb_x="0mm">
    <platedhole x={0} y={0} hole_diameter="1mm" outer_diameter="2mm" />
    <platedhole x="0.2in" y={0} hole_diameter="1mm" outer_diameter="2mm" />
    <box x="1.5mm" y={0} width="2.5mm" height="3mm" />
    <line x1="0mm" y1="0mm" x2="3mm" y2="0mm" />
    <port name="l" x="0mm" y="0mm" dir="left" />
    <port name="r" x="3mm" y="0mm" dir="right" />
  </component>
)

const ExampleCircuit = () => {
  return (
    <group>
      <Resistor />
      {/* <group x="5mm" y="2mm"> */}
      <Led />
      {/* </group> */}
    </group>
  )
}

test("example led-circuit", async (t) => {
  const pb = createProjectBuilder()
  const result = await createRoot().render(<ExampleCircuit />, pb)
  await logLayout("led circuit react-fiber", result)
  t.pass()
})
