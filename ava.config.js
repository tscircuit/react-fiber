module.exports = {
  files: ["tests/**/*.test.tsx", "tests/**/*.test.ts"],
  extensions: ["ts", "tsx"],
  require: ["esbuild-register"],
  ignoredByWatcher: [".next", ".nsm"],
}
