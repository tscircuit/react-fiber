import set from "lodash/set"
import get from "lodash/get"

export const PROP_PATH_TO_SCHEMATIC_PROPERTY_MAP = {
  port_arrangement: "port_arrangement",
  port_labels: "port_labels",
  rotation: "schematic_rotation",
  schematic_rotation: "schematic_rotation",
  "center.0": "schematic_center.x",
  "center.x": "schematic_center.x",
  "center.1": "schematic_center.y",
  "center.y": "schematic_center.y",
  x: "schematic_center.x",
  cx: "schematic_center.x",
  sch_x: "schematic_center.x",
  y: "schematic_center.y",
  cy: "schematic_center.y",
  sch_y: "schematic_center.y",
}
export const getSchematicPropertiesFromProps = (props: any): any => {
  const ret = {}

  for (const [prop_path, schematic_propery_path] of Object.entries(
    PROP_PATH_TO_SCHEMATIC_PROPERTY_MAP
  )) {
    const v = get(props, prop_path.split("."))
    if (v !== undefined) {
      set(ret, schematic_propery_path.split("."), v)
    }
  }

  return ret
}
