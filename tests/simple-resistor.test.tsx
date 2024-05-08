import React from "react"
import test from "ava"
import { createRoot } from "lib/render"
import { createProjectBuilder } from "@tscircuit/builder"
import { logLayout } from "./utils/log-layout"
import "types/intrinsic-jsx.d.ts"

const ExampleCircuit = () => {
  return (
    <group>
      <resistor
        name="R1"
        footprint="0402"
        schX={0}
        schY={0}
        pcbX="2mm"
        pcbY={0}
        resistance="10kohm"
      />
    </group>
  )
}

test("example simple resistor", async (t) => {
  const pb = createProjectBuilder()
  const result = await createRoot().render(<ExampleCircuit />, pb)
  await logLayout("simple resistor", result)
  t.truthy(result.some((r) => r.type === "pcb_smtpad"))
  const smt_pad_ex = result.find((r) => r.type === "pcb_smtpad") as any
  t.truthy(smt_pad_ex)
  t.truthy(smt_pad_ex.x === 1.5 || smt_pad_ex.x === 2.5)
})
