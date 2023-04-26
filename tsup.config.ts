import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "./src/**",
    "!./src/schema.gql",
    "!./src/docs/diagrams/diagram_erd.md",
  ],
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: "dist",
});
