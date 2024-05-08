import React from "react"
import test from "ava"
import { createRoot } from "lib/render"
import { createProjectBuilder } from "@tscircuit/builder"
import { logLayout } from "./utils/log-layout"
import "types/intrinsic-jsx.d.ts"

const Resistor = () => (
  <component name="R1">
    <platedhole pcbX={0} pcbY={0} holeDiameter="1mm" outerDiameter="2mm" />
    <platedhole pcbX="0.2in" pcbY={0} holeDiameter="1mm" outerDiameter="2mm" />
    <schematicbox schX="1.5mm" schY={0} width="2.5mm" height="3mm" />
    <line x1="0mm" y1="0mm" x2="3mm" y2="0mm" />
    <port name="l" schX="0mm" schY="0mm" direction="left" />
    <port name="r" schX="3mm" schY="0mm" direction="right" />
  </component>
)

const Led = () => (
  <component name="LED" schX="5mm" schY="0mm" pcbY="4mm" pcbX="0mm">
    <platedhole pcbX={0} pcbY={0} holeDiameter="1mm" outerDiameter="2mm" />
    <platedhole pcbX="0.2in" pcbY={0} holeDiameter="1mm" outerDiameter="2mm" />
    <schematicbox schX="1.5mm" schY={0} width="2.5mm" height="3mm" />
    <line x1="0mm" y1="0mm" x2="3mm" y2="0mm" />
    <port name="l" schX="0mm" schY="0mm" direction="left" />
    <port name="r" schX="3mm" schY="0mm" direction="right" />
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
