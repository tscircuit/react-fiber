import { createProjectBuilder } from "@tscircuit/builder"
import { AnySoupElement } from "@tscircuit/soup"
import { ExecutionContext } from "ava"
import { logLayout } from "tests/utils/log-layout"
import { createRoot } from "lib/render"

export const getTestFixture = (t: ExecutionContext) => {
  return {
    render: (elms: any): Promise<AnySoupElement[]> => {
      const pb = createProjectBuilder()

      return createRoot().render(elms, pb) as any as Promise<AnySoupElement[]>
    },
    logSoup: (soup: AnySoupElement[]) => {
      return logLayout(t.title, soup)
    },
  }
}
