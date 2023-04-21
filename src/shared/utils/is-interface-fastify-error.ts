import { FastifyError } from "fastify";

export const isInterfaceFastifyError = (
  type: unknown
): type is FastifyError => {
  if (typeof type === "object" && type !== null)
    return "code" in type && "name" in type && "statusCode" in type;
};
