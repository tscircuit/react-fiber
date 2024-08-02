import test from "ava"
import React from "react"
import { Cube } from "jscad-fiber"
import { su } from "@tscircuit/soup-util"
import { getTestFixture } from "tests/fixtures/get-test-fixture"

test("<jscad /> as cadModel", async (t) => {
  const { render } = await getTestFixture(t)

  const soup = await render(
    <chip
      name="U1"
      footprint="0402"
      cadModel={
        <jscad>
          <Cube size={10} />
        </jscad>
      }
    ></chip>,
  )

  const [cad_component] = su(soup).cad_component.list()
  t.deepEqual(cad_component.model_jscad, [{ type: "cube", size: 10 }])
})

// test("<jscad /> as child of <chip />", async (t) => {
//   const { render } = await getTestFixture(t)

//   const soup = await render(
//     <chip name="U1">
//       <jscad>
//         <Cube size={10} />
//       </jscad>
//     </chip>,
//   )

//   const [cad_component] = su(soup).cad_component.list()
//   console.log(cad_component)
// })
