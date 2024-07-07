import { createProjectBuilder } from "@tscircuit/builder"
import { AnySoupElement } from "@tscircuit/soup"
import { ExecutionContext } from "ava"
import { createRoot } from "lib/render"
import { logSoup } from "@tscircuit/log-soup"

export const getTestFixture = (t: ExecutionContext) => {
  return {
    render: (elms: any): Promise<AnySoupElement[]> => {
      const pb = createProjectBuilder()

      return createRoot().render(elms, pb) as any as Promise<AnySoupElement[]>
    },
    logSoup: (soup: AnySoupElement[]) => {
      if (process.env.CI) return
      return logSoup(`react-fiber:${t.title}`, soup)
    },
  }
}
