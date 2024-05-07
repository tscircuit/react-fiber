import * as Props from "../props"
import { createUseComponentWithZod } from "./create-use-component-with-zod"

export const useResistor = createUseComponentWithZod(
  "resistor",
  Props.resistor_props,
  Props.resistor_pins
)

export const useCapacitor = createUseComponentWithZod(
  "capacitor",
  Props.capacitor_props,
  Props.capacitor_pins
)

export const useInductor = createUseComponentWithZod(
  "inductor",
  Props.inductor_props,
  Props.inductor_pins
)

export const useDiode = createUseComponentWithZod(
  "diode",
  Props.diode_props,
  Props.diode_pins
)

export const useLed = createUseComponentWithZod(
  "led",
  Props.led_props,
  Props.led_pins
)
