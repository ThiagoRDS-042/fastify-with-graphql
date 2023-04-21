import "dotenv/config";

import pino from "pino";
import { z } from "zod";

import { AppError, codes, errors } from "@shared/errors";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  const logger = pino();

  logger.error("Invalid environment variables ", _env.error.format());

  throw new AppError(
    "Internal server error.",
    codes.INTERNAL_SERVER_ERROR,
    errors.INTERNAL_SERVER_ERROR
  );
}

export const env = _env.data;
