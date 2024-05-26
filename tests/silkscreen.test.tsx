import React from "react"
import test from "ava"
import { getTestFixture } from "./fixtures/get-test-fixture"
import type { SchematicComponent } from "@tscircuit/builder"
import { layout } from "@tscircuit/layout"

test("silkscreen text render", async (t) => {
  const { render, logSoup } = await getTestFixture(t)

  const soup = await render(
    <group>
      <component
        name="R1"
        footprint={
          <footprint>
            <silkscreentext
              text="hello world"
              pcbX={0}
              pcbY={0}
              pcbRotation={0}
              layer="top"
            />
          </footprint>
        }
      ></component>
    </group>
  )

  await logSoup(soup)

  const text = soup.find((s) => s.type === "pcb_silkscreen_text")

  t.is(text?.text, "hello world")
})
