import defaultAxios from "axios"
import { Mutex } from "async-mutex"

const DEBUG_SRV = `https://debug.tscircuit.com`

const axios = defaultAxios.create({
  baseURL: DEBUG_SRV,
})

function findSource(elm: any, sources: Array<any>) {
  if (elm.source_component_id) {
    return sources.find(
      (s) =>
        s.source_component_id === elm.source_component_id &&
        s.type === "source_component"
    )
  }
  if (elm.source_port_id) {
    return sources.find(
      (s) => s.source_port_id === elm.source_port_id && s.type === "source_port"
    )
  }
  return null
}

const request_mutex = new Mutex()

let layout_server_healthy: boolean | null = null
export const logLayout = async (
  layout_group_name: string,
  objects: Array<any>
) => {
  if (layout_server_healthy === false) return

  if (layout_server_healthy === null) {
    try {
      await axios.get("/api/health", {
        timeout: 5000,
      })
      layout_server_healthy = true
    } catch (e) {
      console.log(`${DEBUG_SRV} unhealthy, not uploading`)
      layout_server_healthy = false
      return
    }
  }

  for (const layout_name of ["schematic", "pcb"]) {
    await request_mutex.runExclusive(async () => {
      await axios
        .post("/api/soup_group/add_soup", {
          soup_group_name: `react-fiber:${layout_group_name}`,
          soup_name: layout_name,
          username: "tmp",
          content: {
            elements: objects
              .filter(
                (o) =>
                  o.type?.includes(layout_name) || o.type?.includes("source")
              )
              .map((o: any) => ({
                ...o,
                source: findSource(o, objects),
              })),
          },
        })
        .catch((e) => {
          console.warn(`Couldn't log layout: ${layout_group_name}`)
        })
    })
  }
}
