import { PrismaClient } from "@prisma/client";

import { env } from "@env";

export const prisma = new PrismaClient({
  log:
    env.NODE_ENV === "development"
      ? [
          { emit: "stdout", level: "query" },
          { emit: "stdout", level: "error" },
          { emit: "stdout", level: "info" },
          { emit: "stdout", level: "warn" },
        ]
      : null,
  errorFormat: "colorless",
});
