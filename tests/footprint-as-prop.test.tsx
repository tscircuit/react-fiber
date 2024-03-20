import React, { Fragment } from "react"
import test from "ava"
import { createRoot } from "lib/render"
import { createProjectBuilder } from "@tscircuit/builder"
import { logLayout } from "./utils/log-layout"

export const FragmentFootprint = () => {
  return (
    <resistor
      name="R1"
      resistance="10 ohm"
      footprint={
        // <>
        <smtpad
          shape="rect"
          size={{ width: "2mm", height: "2mm" }}
          pcb_cx={0}
          pcb_cy={0}
        />
        // <smtpad pcb_cx={1} pcb_cy={0} />
        // </>
      }
      center={[2, 1]}
    >
      {/* <smtpad pcb_cx={0} pcb_cy={0} />
      <smtpad pcb_cx={1} pcb_cy={0} /> */}
    </resistor>
  )
}

test("example footprint resistor capacitor trace", async (t) => {
  const pb = createProjectBuilder()
  const result = await createRoot().render(<FragmentFootprint />, pb)
  console.log(result)
  await logLayout("fragment footprint example", result)
  t.pass()
})
