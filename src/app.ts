import "reflect-metadata";

import path from "node:path";
import Fastify from "fastify";
import cors from "@fastify/cors";
import mercurius from "mercurius";
import fastifyJwt from "@fastify/jwt";
import { buildSchemaSync } from "type-graphql";

import { env } from "@env";
import { loggerConfig } from "@configs/logger";
import { errorFormatter } from "@shared/errors";
import { postResolvers } from "@modules/posts/infra/http/graphql/resolvers";
import { authorResolvers } from "@modules/authors/infra/http/graphql/resolvers";

export const app = Fastify({
  logger: loggerConfig[env.NODE_ENV] ?? true,
});

app.register(cors, {
  credentials: true,
  origin: "*",
  allowedHeaders: "*",
  methods: "*",
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: "10m",
  },
});

const schema = buildSchemaSync({
  resolvers: [...authorResolvers, ...postResolvers],
  emitSchemaFile: path.resolve(__dirname, "schema.gql"),
});

app.register(mercurius, {
  schema,
  errorFormatter,
});
