import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "./src/**",
    "!./src/schema.gql",
    "!./src/docs/diagrams",
    "!./src/docs/insomnia",
  ],
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: "dist",
});
