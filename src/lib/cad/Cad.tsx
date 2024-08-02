import { useRenderElementsToJscadPlan } from "jscad-fiber"
import { jscadPlanner } from "jscad-planner"

export const Cad = ({ children }: { children?: any }) => {
  const { jscadElms, loading, error } = useRenderElementsToJscadPlan(
    jscadPlanner,
    children,
  )

  return jscadElms
}
