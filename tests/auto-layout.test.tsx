import React from "react"
import test from "ava"
import { getTestFixture } from "./fixtures/get-test-fixture"
import type { SchematicComponent } from "@tscircuit/builder"
import { layout } from "@tscircuit/layout"

test.skip("render auto layout", async (t) => {
  const { render, logSoup } = await getTestFixture(t)

  const soup = await render(
    <group layout={layout().autoLayoutSchematic()}>
      <resistor name="R1" resistance="10k" />
      <resistor name="R2" resistance="10k" />
      <resistor name="R3" resistance="10k" />
      <trace from=".R1 > .right" to=".R2 > .left" />
      <trace from=".R2 > .right" to=".R3 > .left" />
    </group>
  )

  await logSoup(soup)

  const components = soup.filter(
    (s): s is SchematicComponent => s.type === "schematic_component"
  )

  t.falsy(components.every((c) => c.center.x === 0))
})
