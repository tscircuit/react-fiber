import React from "react"
import test from "ava"
import { createRoot } from "lib/render"
import { createProjectBuilder } from "@tscircuit/builder"
import { logLayout } from "./utils/log-layout"
import "types/intrinsic-jsx.d.ts"

const ExampleCircuit = () => {
  return (
    <group>
      <component name="K1">
        <schematicline x1={1} y1={1} x2={2} y2={2} />
      </component>
    </group>
  )
}

test("compat number props, example schematic line", async (t) => {
  const pb = createProjectBuilder()
  const result = await createRoot().render(<ExampleCircuit />, pb)
  await logLayout("compat number props, schematic line", result)
  t.truthy(result.some((r) => r.type === "schematic_line"))
})
