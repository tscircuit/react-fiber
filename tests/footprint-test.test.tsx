import React from "react"
import test from "ava"
import { createRoot } from "lib/render"
import { createProjectBuilder } from "@tscircuit/builder"
import { logLayout } from "./utils/log-layout"

const some_output = [
  {
    type: "pcb_smtpad",
    center_x: "0mm",
    center_y: "-0.65mm",
    size_x: "1mm",
    size_y: "0.6mm",
  },
  {
    type: "pcb_smtpad",
    center_x: "0mm",
    center_y: "0.65mm",
    size_x: "1mm",
    size_y: "0.6mm",
  },
  {
    type: "pcb_smtpad",
    center_x: "-0.95mm",
    center_y: "-0.65mm",
    size_x: "1mm",
    size_y: "0.6mm",
  },
  {
    type: "pcb_smtpad",
    center_x: "-0.95mm",
    center_y: "0.65mm",
    size_x: "1mm",
    size_y: "0.6mm",
  },
  {
    type: "pcb_smtpad",
    center_x: "0.95mm",
    center_y: "-0.65mm",
    size_x: "1mm",
    size_y: "0.6mm",
  },
  {
    type: "pcb_smtpad",
    center_x: "0.95mm",
    center_y: "0.65mm",
    size_x: "1mm",
    size_y: "0.6mm",
  },
]

test("render footprint", async (t) => {
  const pb = createProjectBuilder()
  const result = await createRoot().render(
    <component>
      {some_output.map((s) => (
        <smtpad
          x={s.center_x}
          y={s.center_y}
          width={s.size_x}
          height={s.size_y}
          shape="rect"
        />
      ))}
    </component>,
    pb
  )
  await logLayout("some ai generated footprint", result)
  t.pass()
})
