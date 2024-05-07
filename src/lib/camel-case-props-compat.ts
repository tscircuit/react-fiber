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

  // TODO

  // Convert camelCase props to snake_case for builder
  for (const prop of props) {
    const snakeCaseProp = toSnakeCase(prop)
    if (snakeCaseProp !== prop) {
      props[snakeCaseProp] = props[prop]
      delete props[prop]
    }
  }
}
