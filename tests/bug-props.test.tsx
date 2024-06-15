import test from "ava"
import React from "react"
import { getTestFixture } from "./fixtures/get-test-fixture"

test("bug props", async (t) => {
  const { logSoup, render } = await getTestFixture(t)

  const soup = await render(
    <bug
      schPinSpacing="1.5mm"
      name={"U1"}
      pinLabels={{
        1: "VDD",
        2: "GND",
        3: "D0",
        4: "D1",
      }}
      schPortArrangement={{
        leftSize: 2,
        rightSize: 2,
      }}
    />
  )

  t.pass()
})
