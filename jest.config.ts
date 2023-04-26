import { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";

import { compilerOptions } from "./tsconfig.json";

const config: Config = {
  bail: true,
  moduleFileExtensions: ["js", "json", "ts"],
  testRegex: "/use-cases/.*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: false,
            decorators: true,
          },
          target: "es2020",
          keepClassNames: true,
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
          },
        },
        module: {
          type: "es6",
          noInterop: false,
        },
      },
    ],
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  setupFilesAfterEnv: ["<rootDir>/test/setup/jest-after-env.ts"],
  testEnvironment: "node",
  maxWorkers: 1,
  collectCoverageFrom: ["<rootDir>/src/modules/**/use-cases/*.ts"],
  coverageDirectory: "<rootDir>/coverage/unit",
};

export default config;
