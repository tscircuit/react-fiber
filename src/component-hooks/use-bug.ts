import { z } from "zod"
import { bug_props } from "src/props"

function useBug<
  LS extends number,
  TS extends number,
  RS extends number,
  BS extends number
>(
  name: string,
  props: Omit<z.input<typeof bug_props>, "name" | "schPortArrangement"> & {
    schPortArrangement: {
      leftSize?: LS
      topSize?: TS
      rightSize?: RS
      bottomSize?: BS
    }
  }
): React.ComponentType<{
  name: string
  portLabels: Record<number, string>
  schPortArrangement: {
    leftSize?: LS | undefined
    topSize?: TS | undefined
    rightSize?: RS | undefined
    bottomSize?: BS | undefined
  }
}>

function useBug(name, props) {
  return null as any
}

const MyCircuit = () => {
  const U1 = useBug("U1", {
    schPortArrangement: {
      leftSize: 3,
      rightSize: 2,
    },
  })
}
