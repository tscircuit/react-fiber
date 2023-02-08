import React from "react"
import test from "ava"
import { createRoot } from "lib/render"
import { createProjectBuilder } from "@tscircuit/builder"
import { logLayout } from "./utils/log-layout"

test("render footprint", async (t) => {
  const pb = createProjectBuilder()
  const result = await createRoot().render(
    <component>
      <platedhole x={0} y={0} hole_diameter="1mm" outer_diameter="2mm" />
      <platedhole x="3mm" y={0} hole_diameter="1mm" outer_diameter="2mm" />
      <smtpad x="6mm" y={0} width="3mm" height="3mm" shape="rect" />
    </component>,
    pb
  )
  await logLayout("test footprint react-fiber", result)
  t.pass()
})
