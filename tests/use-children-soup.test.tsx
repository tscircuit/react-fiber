import React from "react"
import test from "ava"
import { renderHook, act, waitFor } from "@testing-library/react"
import { useChildrenSoup } from "../src/component-hooks/use-children-soup"
import { getTestFixture } from "./fixtures/get-test-fixture"

test("useChildrenSoup hook", async (t) => {
  const { render } = getTestFixture(t)

  const TestComponent = () => (
    <group>
      <resistor
        name="R1"
        footprint="0402"
        schX={0}
        schY={0}
        pcbX="2mm"
        pcbY={0}
        resistance="10kohm"
      />
    </group>
  )

  const { result } = renderHook(() => useChildrenSoup(<TestComponent />))

  // Initial state
  t.true(result.current.loading)
  t.is(result.current.soup?.length, 0)
  t.is(result.current.error, null)

  // Wait for the hook to finish
  await act(async () => {
    await waitFor(() => result.current.loading)
  })

  // Final state
  t.false(result.current.loading)
  t.truthy(result.current.soup)
  t.is(result.current.error, null)

  // Check if the soup contains expected elements
  const soup = result.current.soup
  console.log({ soup })
  t.truthy(soup?.some((element) => element.type === "pcb_component"))
  t.truthy(soup?.some((element) => element.type === "pcb_smtpad"))

  // Verify some properties of the resistor
  const resistor = soup?.find(
    (element) => element.type === "source_component",
  ) as any
  t.is(resistor.name, "R1")
  t.is(resistor.footprint, "0402")
  t.is(resistor.resistance, "10kohm")

  // Log the soup for debugging (this will only run if not in CI)
  if (soup) {
    await render(<TestComponent />).then((renderedSoup) => {
      t.deepEqual(
        soup,
        renderedSoup,
        "Soup from hook should match direct render",
      )
    })
  }
})
