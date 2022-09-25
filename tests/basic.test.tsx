// import TSCircuit from "lib/TSCircuit"
import React from "react"
import test from "ava"
import { createRoot } from "lib/render"
import { createProjectBuilder } from "@tscircuit/builder"
// import "types/intrinsic-jsx.d"

const HOC = ({ children }) => {
  return children
}

test("render higher order component, <resistor /> and <custom />", async (t) => {
  const pb = createProjectBuilder()
  const result = await createRoot().render(
    // <HOC>
    <resistor />,
    //   <custom
    //     onRender={(groupBuilder) => {
    //       groupBuilder.addCapacitor((cb) => {
    //         cb.setName("custom cap")
    //       })
    //     }}
    //   />
    // </HOC>
    pb
  )
  console.log(result)
  t.pass()
})
