import React from "react"
import test from "ava"
import { createRoot } from "lib/render"
import { createProjectBuilder } from "@tscircuit/builder"
import { logLayout } from "./utils/log-layout"
import "types/intrinsic-jsx.d.ts"

const ExampleCircuit = () => {
  return (
    <group>
      <resistor footprint="0402" />
    </group>
  )
}

test("example simple resistor", async (t) => {
  const pb = createProjectBuilder()
  const result = await createRoot().render(<ExampleCircuit />, pb)
  await logLayout("simple resistor react-fiber", result)
  t.truthy(result.some((r) => r.type === "pcb_smtpad"))
})
