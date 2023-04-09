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
      footprint: {} // just has children
      component: {} // just has children
      platedhole: Parameters<B.PlatedHoleBuilder["setProps"]>[0]
      hole: Partial<Omit<B.PCBHole, "type">>
      schematicdrawing: {} // just has children

      // box can be used for pcb silkscreen too... maybe remove?
      box: Parameters<B.SchematicBoxBuilder["setProps"]>[0]
      schematicbox: Parameters<B.SchematicBoxBuilder["setProps"]>[0]
      constraint: Parameters<B.ConstraintBuilder["setProps"]>[0]
      contrainedlayout: Parameters<B.ConstrainedLayoutBuilder["setProps"]>[0]

      // "line" conflicts w/ svg
      sline: Parameters<B.SchematicLineBuilder["setProps"]>[0]
    }
  }
}

export default {}
