import { Config } from "jest";
import jestConfig from "./jest.config";

const config: Config = {
  ...jestConfig,
  testEnvironment: "<rootDir>/prisma/prisma-test-environment.ts",
  testRegex: "/resolvers/.*\\.spec\\.ts$",
};

export default config;
