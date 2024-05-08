import * as Props from "../props"
import { createUseComponentWithZod } from "./create-use-component-with-zod"

export const useResistor = createUseComponentWithZod(
  "resistor",
  Props.resistorProps,
  Props.resistorPins
)

export const useCapacitor = createUseComponentWithZod(
  "capacitor",
  Props.capacitorProps,
  Props.capacitorPins
)

export const useInductor = createUseComponentWithZod(
  "inductor",
  Props.inductorProps,
  Props.inductorPins
)

export const useDiode = createUseComponentWithZod(
  "diode",
  Props.diodeProps,
  Props.diodePins
)

export const useLed = createUseComponentWithZod(
  "led",
  Props.ledProps,
  Props.ledPins
)
