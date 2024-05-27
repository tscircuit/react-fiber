import React from "react"
import test from "ava"
import { useBug } from "src/component-hooks"
import { getTestFixture } from "tests/fixtures/get-test-fixture"
import { su } from "@tscircuit/soup-util"

test("useBug", async (t) => {
  const { render } = getTestFixture(t)
  const U1 = useBug("U1", {
    pinLabels: {
      1: "GND" as const,
      2: "VCC",
      3: "OUT",
    } as const,
    schPortArrangement: {
      leftSize: 2,
      rightSize: 1,
    },
  })

  t.is(U1.pin1, ".U1 > .pin1")

  // @ts-expect-error
  U1.pin4

  t.is(U1.GND, ".U1 > .GND")

  t.truthy(<U1 pin1="..." OUT="..." />)

  const soup = await render(<U1 />)
  t.is(su(soup).source_component.getWhere({ name: "U1" })!.ftype, "simple_bug")
})
