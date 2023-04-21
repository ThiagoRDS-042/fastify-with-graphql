import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src", "!./src/schema.gql"],
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: "dist",
});
