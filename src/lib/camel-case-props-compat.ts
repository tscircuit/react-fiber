import { toSnakeCase } from "convert-case"

export const camelCasePropsCompat = (type: string, props: any) => {
  // TODO remove once builder supports sch_x
  if ("schX" in props) {
    props.x = props.schX
  }
  if ("schY" in props) {
    props.y = props.schY
  }

  // TODO remove once builder supports pcb_center_x
  if ("pcbCenterX" in props) {
    props.center_x = props.pcbCenterX
  }
  if ("pcbCenterY" in props) {
    props.center_y = props.pcbCenterY
  }
  if ("schRotation" in props) {
    props.rotation = props.schRotation
  }

  if ("pinLabels" in props) {
    props.port_labels = props.pinLabels
  }

  // Convert camelCase props to snake_case for builder
  function deepConvertCamelCase(obj: Object) {
    for (const prop in obj) {
      const snakeCaseProp = toSnakeCase(prop)
      if (snakeCaseProp !== prop) {
        obj[snakeCaseProp] = obj[prop]
        delete obj[prop]
      }
      if (typeof obj[snakeCaseProp] === "object") {
        deepConvertCamelCase(obj[snakeCaseProp])
      }
    }
  }

  deepConvertCamelCase(props)
}
