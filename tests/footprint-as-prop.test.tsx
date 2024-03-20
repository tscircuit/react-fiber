import React, { Fragment } from "react"
import test from "ava"
import { createRoot } from "lib/render"
import { createProjectBuilder } from "@tscircuit/builder"
import { logLayout } from "./utils/log-layout"

export const FootprintDefUsage1 = () => {
  return (
    <resistor
      name="R1"
      resistance="10 ohm"
      footprint={
        <footprint>
          <smtpad shape="rect" x={0} y={0} width="2mm" height="2mm" />
          <smtpad shape="rect" x="1mm" y={0} width="2mm" height="2mm" />
        </footprint>
      }
      center={[2, 1]}
    >
      {/* <smtpad pcb_cx={0} pcb_cy={0} />
      <smtpad pcb_cx={1} pcb_cy={0} /> */}
    </resistor>
  )
}
export const FootprintDefUsage2 = () => {
  return (
    <resistor
      name="R1"
      resistance="10 ohm"
      footprint={
        <>
          <smtpad shape="rect" x={0} y={0} width="2mm" height="2mm" />
          <smtpad shape="rect" x="1mm" y={0} width="2mm" height="2mm" />
        </>
      }
      center={[2, 1]}
    >
      {/* <smtpad pcb_cx={0} pcb_cy={0} />
      <smtpad pcb_cx={1} pcb_cy={0} /> */}
    </resistor>
  )
}
export const FootprintDefUsage3 = () => {
  return (
    <resistor name="R1" resistance="10 ohm" center={[2, 1]}>
      <footprint>
        <smtpad shape="rect" x={0} y={0} width="2mm" height="2mm" />
        <smtpad shape="rect" x="1mm" y={0} width="2mm" height="2mm" />
      </footprint>
    </resistor>
  )
}

test("footprint def usage 1", async (t) => {
  const pb = createProjectBuilder()
  const result = await createRoot().render(<FootprintDefUsage1 />, pb)
  await logLayout("footprint def usage 1 example", result)
  const smtpads = result
    .filter((r) => r.type === "pcb_smtpad")
    .sort((a: any, b: any) => a.x - b.x)
  const [a, b] = smtpads as any
  t.is(a.x, 0)
  t.is(b.x, 1)
  t.is(a.width, 2)
  t.is(b.width, 2)
})
test("footprint def usage 2", async (t) => {
  const pb = createProjectBuilder()
  const result = await createRoot().render(<FootprintDefUsage2 />, pb)
  await logLayout("footprint def usage 2 example", result)
  const smtpads = result
    .filter((r) => r.type === "pcb_smtpad")
    .sort((a: any, b: any) => a.x - b.x)
  const [a, b] = smtpads as any
  t.is(a.x, 0)
  t.is(b.x, 1)
  t.is(a.width, 2)
  t.is(b.width, 2)
})
test("footprint def usage 3", async (t) => {
  const pb = createProjectBuilder()
  const result = await createRoot().render(<FootprintDefUsage3 />, pb)
  await logLayout("footprint def usage 3 example", result)
  const smtpads = result
    .filter((r) => r.type === "pcb_smtpad")
    .sort((a: any, b: any) => a.x - b.x)
  const [a, b] = smtpads as any
  t.is(a.x, 0)
  t.is(b.x, 1)
  t.is(a.width, 2)
  t.is(b.width, 2)
})
