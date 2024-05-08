import React, { Fragment } from "react"
import test from "ava"
import { createRoot } from "lib/render"
import { createProjectBuilder } from "@tscircuit/builder"
import { logLayout } from "./utils/log-layout"

export const ExampleCircuit = () => {
  return (
    <Fragment>
      <resistor
        name="R1"
        resistance="10 ohm"
        footprint="0402"
        schX={2}
        schY={1}
      />
      <capacitor
        name="C1"
        capacitance="10 uF"
        schX={4}
        schY={2}
        schRotation="90deg"
        footprint="0402"
        pcbX="4mm"
        pcbY="2mm"
      />
      <trace path={[".R1 > port.right", ".C1 > port.left"]} />
    </Fragment>
  )
}

test("example footprint resistor capacitor trace", async (t) => {
  const pb = createProjectBuilder()
  const result = await createRoot().render(<ExampleCircuit />, pb)
  await logLayout("example footprint resistor capacitor trace", result)
  t.pass()
})
