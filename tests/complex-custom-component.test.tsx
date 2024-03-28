import React from "react"
import test from "ava"
import { createRoot } from "lib/render"
import { createProjectBuilder } from "@tscircuit/builder"
import { logLayout } from "./utils/log-layout"

test("react fiber complex component", async (t) => {
  const pb = createProjectBuilder()
  const result = await createRoot().render(
    <group>
      <component name="K">
        <schematicbox x={0} y={0} width="5mm" height="5mm" />
        <schematictext x={0} y={0} text="Complex Component" />
        <schematicline x1={-0.1} y1={1} x2={0.1} y2={1} />
        <schematicpath
          points={[
            {
              x: "0.5mm",
              y: "1.5mm",
            },
            {
              x: "1mm",
              y: "1.5mm",
            },
            {
              x: 1,
              y: 2,
            },
          ]}
          is_filled
        />
        <port name="v1" x="2.5mm" y="-1mm" dir="right" />
        <port name="v2" x="2.5mm" y="0mm" dir="right" />
        <port name="gnd" x="2.5mm" y="1mm" dir="right" />
        <platedhole x={0} y={0} hole_diameter="1mm" outer_diameter="2mm" />
        <platedhole x="3mm" y={0} hole_diameter="1mm" outer_diameter="2mm" />
        <smtpad x="6mm" y={0} width="3mm" height="3mm" shape="rect" />
      </component>
      <resistor name="R1" resistance="1k" x={"5mm"} y={0} />
      <trace from=".R1 > .left" to=".K > .v1" />
    </group>,
    pb
  )

  await logLayout("react-fiber complex component", result)
  t.pass()
})
