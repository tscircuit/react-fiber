import React from "react"
import test from "ava"
import { createRoot } from "lib/render"
import { createProjectBuilder } from "@tscircuit/builder"
import { logLayout } from "./utils/log-layout"

const HOC = ({ children }) => {
  return children
}

test("render footprint", async (t) => {
  const pb = createProjectBuilder()
  const result = await createRoot().render(
    <HOC>
      {/* <resistor name="R1" /> */}
      <component>
        <platedhole />
      </component>
    </HOC>,
    pb
  )
  await logLayout("test footprint react-fiber", result)
  t.pass()
})
