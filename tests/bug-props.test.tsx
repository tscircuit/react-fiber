import test from "ava"
import React from "react"
import { getTestFixture } from "./fixtures/get-test-fixture"

test("chip props", async (t) => {
  const { logSoup, render } = await getTestFixture(t)

  const soup = await render(
    <chip
      schPinSpacing="1.5mm"
      name={"U1"}
      pinLabels={{
        1: "VDD",
        2: "GND",
        3: "D0",
        4: "D1",
      }}
      footprint="0402"
      layer={"top"}
      schPortArrangement={{
        leftSize: 2,
        rightSize: 2,
      }}
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/download?uuid=c7acac53bcbc44d68fbab8f60a747688&pn=C17414",
      }}
    />
  )

  await logSoup(soup)
  t.pass()
})
