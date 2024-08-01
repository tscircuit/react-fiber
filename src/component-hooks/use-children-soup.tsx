import { createRoot } from "lib/render"
import type { AnySoupElement } from "@tscircuit/soup"
import { createProjectBuilder } from "@tscircuit/builder"
import { useEffect, useState } from "react"

/**
 * Renders children and returns the soup as a hook
 *
 * This is usually used in "tscircuit entrypoints" like <SchematicViewer />,
 * <PcbViewer /> or <3dViewer /> to convert their children into circuit json (soup)
 */
export const useChildrenSoup = (
  children: React.ReactElement | React.ReactElement[],
) => {
  const [soup, setSoup] = useState<AnySoupElement[] | null>([])
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const pb = createProjectBuilder()
    let isActiveRender = true

    createRoot()
      .render(children, pb)
      .then((elements) => {
        if (!isActiveRender) return
        setSoup(elements)
        setLoading(false)
        setError(null)
      })
      .catch((err: any) => {
        if (!isActiveRender) return
        setError(err)
        setLoading(false)
      })

    return () => {
      isActiveRender = false
    }
  }, [children])

  return { loading, soup, error }
}
