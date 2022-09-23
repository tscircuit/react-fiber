import TSCircuit from "lib/TSCircuit"
import test from "ava"
import { createRoot } from "lib/render"
import "types/intrinsic-jsx.d"

test("render resistor", async (t) => {
  console.log(await createRoot().renderToElements(<resistor />))
  // t.like(render(<resistor />), { ok: true })
})
