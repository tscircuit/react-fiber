import { toCamelCase, toSnakeCase } from "convert-case"

/**
 * Convert camel case props to snake case for builder
 */
export const snakeCasePropsCompat = (type: string, props: any) => {
  props = { ...props }
  // TODO remove once builder supports sch_x
  if ("sch_x" in props || "x" in props) {
    props.schX = props.sch_x ?? props.x
  }
  if ("sch_y" in props || "y" in props) {
    props.schY = props.sch_y ?? props.y
  }

  // TODO remove once builder supports pcb_center_x
  if ("center_x" in props) {
    props.pcbCenterX = props.center_x
  }
  if ("center_y" in props) {
    props.pcbCenterY = props.center_y
  }
  if ("rotation" in props) {
    props.schRotation = props.rotation
  }

  // TODO remove once builder supports direction (instead of dir)
  if ("direction" in props) {
    props.dir = props.direction
  }

  if ("pinLabels" in props) {
    props.port_labels = props.pinLabels
  }

  // TODO remove once builder supports pcb_port_arrangement
  if ("schPortArrangement" in props) {
    props.port_arrangement = props.schPortArrangement
  }

  if (type === "schematictext" && ("schX" in props || "schY" in props)) {
    props.position = { x: props.schX, y: props.schY }
  }

  // TODO remove once builder supports sch_rotation
  if ("schRotation" in props) {
    props.rotation = props.schRotation
  }

  // If it's a pcb component, add x/y
  if (type === "smtpad" || type === "platedhole" || type === "hole") {
    if ("pcbX" in props) {
      props.x = props.pcbX
    }
    if ("pcbY" in props) {
      props.y = props.pcbY
    }
  }

  // Until builder supports sch_x/sch_y universally
  if ("schX" in props) {
    props.x = props.schX
  }
  if ("schY" in props) {
    props.y = props.schY
  }

  // // Convert camelCase props to snake_case for builder
  function deepConvertSnakeCase(obj: Object) {
    for (const prop in obj) {
      if (prop === "children") continue
      if (prop === "footprint") continue
      if (obj[prop]?.["$$typeof"]) continue
      const snakeCaseProp = toSnakeCase(prop)
      if (snakeCaseProp !== prop) {
        obj[snakeCaseProp] = obj[prop]
        delete obj[prop]
      }
      if (typeof obj[snakeCaseProp] === "object") {
        if (Array.isArray(obj[snakeCaseProp])) {
          for (const item of obj[snakeCaseProp]) {
            deepConvertSnakeCase(item)
          }
        } else {
          deepConvertSnakeCase(obj[snakeCaseProp])
        }
      }
    }
  }

  deepConvertSnakeCase(props)
  return props
}
