import { ZodError } from "zod";
import { ExecutionResult } from "graphql";
import { MercuriusContext } from "mercurius";

import { AppError, errors, codes } from "@shared/errors";
import { isInterfaceMercuriusError } from "@shared/utils/is-interface-mercurius-error";

export const errorFormatter = (
  execution: ExecutionResult,
  context: MercuriusContext
) => {
  let statusCode = errors.INTERNAL_SERVER_ERROR;

  const logger = context.reply ? context.reply.log : context.app.log;

  return {
    response: {
      data: null,
      extensions: {},
      ...execution,
      errors: execution.errors.map((err) => {
        if (isInterfaceMercuriusError(err.originalError)) {
          statusCode = errors.BAD_REQUEST;

          return {
            statusCode,
            error: codes.VALIDATION_ERROR,
            _errors: err.originalError.errors,
            ...err,
          };
        }

        if (err.originalError instanceof AppError) {
          const {
            error,
            message,
            statusCode: code,
          } = err.originalError.getResponse();

          statusCode = code;

          return {
            error,
            message,
            statusCode,
            ...err,
          };
        }

        if (err.originalError instanceof ZodError) {
          statusCode = errors.BAD_REQUEST;

          return {
            statusCode,
            error: codes.VALIDATION_ERROR,
            ...err,
            ...err.originalError.format(),
          };
        }

        logger.error(execution);

        return {
          statusCode,
          error: codes.INTERNAL_SERVER_ERROR,
          ...err,
          message: "Internal server error.",
        };
      }),
    },
    statusCode,
  };
};
