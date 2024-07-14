import React from "react"
import test from "ava"
import { createRoot } from "lib/render"
import { createProjectBuilder } from "@tscircuit/builder"
import { logLayout } from "./utils/log-layout"
import { su } from "@tscircuit/soup-util"

test("render footprint", async (t) => {
  const pb = createProjectBuilder()
  const result = await createRoot().render(
    <component name="C1">
      <platedhole pcbX={0} pcbY={0} holeDiameter="1mm" outerDiameter="2mm" />
      <platedhole pcbX="3mm" pcbY={0} holeDiameter="1mm" outerDiameter="2mm" />
      <smtpad pcbX="6mm" pcbY={0} width="3mm" height="3mm" shape="rect" />
    </component>,
    pb
  )

  const [h1, h2] = su(result).pcb_plated_hole.list()

  t.is(h1.hole_diameter, 1)
  t.is(h2.hole_diameter, 1)
  t.is(h1.outer_diameter, 2)
  t.is(h2.outer_diameter, 2)

  await logLayout("test footprint react-fiber", result)
  t.pass()
})

test("render soup as footprint", async (t) => {
  const pb = createProjectBuilder()
  const result = await createRoot().render(
    <component
      name="C1"
      footprint={[
        {
          type: "pcb_smtpad",
          shape: "rect",
          x: 0,
          y: 0,
          height: 3,
          width: 3,
          layer: "top",
          pcb_component_id: "",
          pcb_smtpad_id: "",
          pcb_port_id: "",
        },
      ]}
    />,
    pb
  )
  await logLayout("render soup as footprint", result)
  t.pass()
})
