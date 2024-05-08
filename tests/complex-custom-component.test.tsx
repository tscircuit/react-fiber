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
        <schematicbox schX={0} schY={0} width="5mm" height="5mm" />
        <schematictext schX={0} schY={0} text="Complex Component" />
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
          isFilled
        />
        <port name="v1" schX="2.5mm" schY="-1mm" direction="right" />
        <port name="v2" schX="2.5mm" schY="0mm" direction="right" />
        <port name="gnd" schX="2.5mm" schY="1mm" direction="right" />
        <platedhole pcbX={0} pcbY={0} holeDiameter="1mm" outerDiameter="2mm" />
        <platedhole
          pcbX="3mm"
          pcbY={0}
          holeDiameter="1mm"
          outerDiameter="2mm"
        />
        <smtpad pcbX="6mm" pcbY={0} width="3mm" height="3mm" shape="rect" />
      </component>
      <resistor name="R1" resistance="1k" schX={"5mm"} schY={0} />
      <trace from=".R1 > .left" to=".K > .v1" />
    </group>,
    pb
  )

  await logLayout("react-fiber complex component", result)
  t.pass()
})
