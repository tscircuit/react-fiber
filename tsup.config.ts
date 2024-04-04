import { defineConfig } from "tsup"

export default defineConfig({
  tsconfig: "./tsconfig.json",
  entry: ["./src"],
  // treeshake: true,
  dts: true,
  sourcemap: true,
  clean: true,
})
