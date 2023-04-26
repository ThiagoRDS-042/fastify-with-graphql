import "dotenv/config";

import { Client } from "pg";
import util from "node:util";
import { randomUUID } from "node:crypto";
import { exec } from "node:child_process";
import NodeEnvironment from "jest-environment-node";

import type {
  JestEnvironmentConfig,
  EnvironmentContext,
} from "@jest/environment";

const execSync = util.promisify(exec);

const prismaBinary = "./node_modules/.bin/prisma";

const generateDatabaseURL = (schema: string) => {
  if (!process.env.DATABASE_URL) {
    throw new Error("Please provider a DATABASE_URL environment variable.");
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set("schema", schema);

  return url.toString();
};

export default class PrismaTestEnvironment extends NodeEnvironment {
  private schema: string;
  private connectionString: string;

  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context);

    this.schema = randomUUID();
    this.connectionString = generateDatabaseURL(this.schema);
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;

    await execSync(`${prismaBinary} migrate deploy`);
  }

  async teardown() {
    const client = new Client({
      connectionString: this.connectionString,
    });

    await client.connect();
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
    await client.end();
  }
}
