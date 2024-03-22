import * as Builder from "@tscircuit/builder"

export const builderTypeToInitializer = {
  resistor: Builder.createResistorBuilder,
  capacitor: Builder.createCapacitorBuilder,
  inductor: Builder.createInductorBuilder,
  diode: Builder.createDiodeBuilder,
  ground: Builder.createGroundBuilder,
  bug: Builder.createBugBuilder,
  powersource: Builder.createPowerSourceBuilder,
  netalias: Builder.createNetAliasBuilder,
  group: Builder.createGroupBuilder,
  trace: Builder.createTraceBuilder,
  smtpad: Builder.createSMTPadBuilder,
  port: Builder.createPortBuilder,
  ports: Builder.createPortsBuilder,
  footprint: Builder.createFootprintBuilder,
  component: Builder.createComponentBuilder,
  platedhole: Builder.createPlatedHoleBuilder,
  hole: Builder.createHoleBuilder,
  via: Builder.createViaBuilder,
  schematicdrawing: (Builder as any).createSchematicDrawingBuilder,
  box: Builder.createBoxBuilder, // CONTEXT DEPENDENT HOW DO? TODO
  schematicbox: Builder.createSchematicBoxBuilder,
  line: Builder.createSchematicLineBuilder,
  sline: Builder.createSchematicLineBuilder,
  schematicline: Builder.createSchematicLineBuilder,
  constraint: Builder.createConstraintBuilder,
  board: (Builder as any).createBoardBuilder,
  silkscreen: (Builder as any).createSilkscreenBuilder,
  copperpour: (Builder as any).createCopperPourBuilder,
  circle: (Builder as any).createCircleBuilder,
  text: Builder.createSchematicTextBuilder,
  image: (Builder as any).createImageBuilder,
  constrainedlayout: Builder.createConstrainedLayoutBuilder,
}

export type BuilderType = keyof typeof builderTypeToInitializer

export const getBuilderForType = (
  type: string,
  project_builder: Builder.ProjectBuilder
): Builder.ComponentBuilder | Builder.TraceBuilder | Builder.GroupBuilder => {
  if (!(type in builderTypeToInitializer)) {
    throw new Error(`Unknown builder type: "${type}"`)
  }
  if (builderTypeToInitializer[type] === undefined) {
    throw new Error(`No initializer for builder type: "${type}"`)
  }
  return builderTypeToInitializer[type](project_builder)
}
