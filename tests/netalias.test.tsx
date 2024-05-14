import React from "react"
import test from "ava"
import { createRoot } from "lib/render"
import { createProjectBuilder } from "@tscircuit/builder"
import "types/intrinsic-jsx.d"

test("render higher order component, <resistor /> and <custom />", async (t) => {
  const pb = createProjectBuilder()
  const result = await createRoot().render(
    <group>
      <netalias net="D0BUS" />
    </group>,
    pb
  )
  const port: any = result.find(
    (e) => e.type === "source_port" && e.source_component_id === "net_alias_0"
  )
  t.is(port.name, "D0BUS")
})
