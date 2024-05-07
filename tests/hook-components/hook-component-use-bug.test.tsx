import React from "react"
import test from "ava"
import { useBug } from "src/component-hooks"

test("useBug", (t) => {
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
})
