import type * as B from "@tscircuit/builder"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      resistor: Parameters<B.ResistorBuilder["setSourceProperties"]>[0]
      custom: any
      capacitor: Parameters<B.CapacitorBuilder["setSourceProperties"]>[0]
      inductor: Parameters<B.InductorBuilder["setSourceProperties"]>[0]
      diode: Parameters<B.DiodeBuilder["setSourceProperties"]>[0]
      bug: Parameters<B.BugBuilder["setSourceProperties"]>[0]
      ground: Parameters<B.GroundBuilder["setSourceProperties"]>[0]
      powersource: Parameters<B.PowerSourceBuilder["setSourceProperties"]>[0]
      group: Parameters<B.GroupBuilder["setSourceProperties"]>[0]
      trace: Parameters<B.TraceBuilder["setSourceProperties"]>[0]
      smtpad: Parameters<B.SMTPadBuilder["setSourceProperties"]>[0]
      port: {
        name: string
        direction?: string
        dir?: string
        x: number | string
        y: number | string
      }
      ports: Parameters<B.PortsBuilder["setSourceProperties"]>[0]
      footprint: any
      component: any
      platedhole: any
      hole: Partial<Omit<B.PCBHole, "type">>
      schematicdrawing: any
      box: any
      schematicbox: any
      constraint: any
      // conflicts w/ svg
      // line: any
    }
  }
}

export default {}
