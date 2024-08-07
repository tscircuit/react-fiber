import * as Builder from "@tscircuit/builder"

export const builderTypeToInitializer = {
  resistor: Builder.createResistorBuilder,
  board: Builder.createBoardBuilder,
  capacitor: Builder.createCapacitorBuilder,
  inductor: Builder.createInductorBuilder,
  diode: Builder.createDiodeBuilder,
  led: Builder.createDiodeBuilder,
  ground: Builder.createGroundBuilder,
  bug: Builder.createBugBuilder,
  // TODO remove once builder adds/renames to createChipBuilder
  chip: (Builder as any).createChipBuilder ?? Builder.createBugBuilder,
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
  schematicpath: Builder.createSchematicPathBuilder,
  constraint: Builder.createConstraintBuilder,
  silkscreen: (Builder as any).createSilkscreenBuilder,
  copperpour: (Builder as any).createCopperPourBuilder,
  circle: (Builder as any).createCircleBuilder,
  text: Builder.createSchematicTextBuilder,
  schematictext: Builder.createSchematicTextBuilder,
  image: (Builder as any).createImageBuilder,
  constrainedlayout: Builder.createConstrainedLayoutBuilder,
  tracehint: Builder.createTraceHintBuilder,
  silkscreenpath: Builder.createSilkscreenPathBuilder,
  silkscreentext: Builder.createSilkscreenTextBuilder,
  silkscreenline: Builder.createSilkscreenLineBuilder,
  silkscreenrect: Builder.createSilkscreenRectBuilder,
  silkscreencircle: Builder.createSilkscreenCircleBuilder,
  pcbtrace: Builder.createBasicPcbTraceBuilder,
  fabricationtext: Builder.createFabricationNoteTextBuilder,
  fabricationnotetext: Builder.createFabricationNoteTextBuilder,
  fabricationpath: Builder.createFabricationNotePathBuilder,
  fabricationnotepath: Builder.createFabricationNotePathBuilder,
}

export type BuilderType = keyof typeof builderTypeToInitializer

export const getBuilderForType = (
  type: string,
  project_builder: Builder.ProjectBuilder,
): Builder.ComponentBuilder | Builder.TraceBuilder | Builder.GroupBuilder => {
  if (!(type in builderTypeToInitializer)) {
    throw new Error(`Unknown builder type (@tscircuit/react-fiber): "${type}"`)
  }
  if (builderTypeToInitializer[type] === undefined) {
    throw new Error(`No initializer for builder type: "${type}"`)
  }
  return builderTypeToInitializer[type](project_builder)
}
