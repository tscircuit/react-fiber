import TSCircuit from "lib/TSCircuit"
import test from "ava"

test("render something basic", (t) => {
  t.like(<resistor />, { ok: true })
})
