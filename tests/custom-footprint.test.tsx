import React from "react"
import test from "ava"
import { createRoot } from "lib/render"
import { createProjectBuilder } from "@tscircuit/builder"
import { logLayout } from "./utils/log-layout"

test("render footprint", async (t) => {
  const pb = createProjectBuilder()
  const result = await createRoot().render(
    <component>
      <schematicbox x={0} y={0} width="10mm" height="10mm" />
      <port name="v1" x="5mm" y="-3mm" dir="right" />
      <port name="v2" x="5mm" y="0mm" dir="right" />
      <port name="gnd" x="5mm" y="3mm" dir="right" />
      <platedhole x={0} y={0} hole_diameter="1mm" outer_diameter="2mm" />
      <platedhole x="3mm" y={0} hole_diameter="1mm" outer_diameter="2mm" />
      <smtpad x="6mm" y={0} width="3mm" height="3mm" shape="rect" />
    </component>,

    pb
  )
  await logLayout("react-fiber some test", result)
  t.pass()
})
