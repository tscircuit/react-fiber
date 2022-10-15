import { createProjectBuilder } from "@tscircuit/builder"
import React, { useState, useEffect } from "react"
import { createRoot } from "./render"
import { AnyElement } from "@tscircuit/builder"

export const useRenderedElements = (
  children: React.ReactElement | React.ReactElement[]
) => {
  const [elements, setElements] = useState<Array<AnyElement>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    // TODO re-use project builder
    const projectBuilder = createProjectBuilder()
    createRoot()
      .render(children, projectBuilder as any)
      .then((elements) => {
        setElements(elements)
        setLoading(false)
      })
  }, [children])

  return { elements, loading }
}
