import defaultAxios from "axios"

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

let layout_server_healthy: boolean | null = null
export const logLayout = async (
  layout_group_name: string,
  objects: Array<any>
) => {
  if (layout_server_healthy === false) return

  if (layout_server_healthy === null) {
    try {
      await axios.get("/api/health", {
        timeout: 1000,
      })
      layout_server_healthy = true
    } catch (e) {
      layout_server_healthy = false
      return
    }
  }

  for (const layout_name of ["schematic", "pcb"]) {
    await axios.post("/api/soup_group/add_soup", {
      soup_group_name: layout_group_name,
      soup_name: layout_name,
      username: "tmp",
      content: {
        elements: objects
          .filter((o) => o.type?.includes(layout_name))
          .map((o: any) => ({
            ...o,
            source: findSource(o, objects),
          })),
      },
    })
  }
}
