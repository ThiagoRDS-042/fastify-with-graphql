import { MiddlewareFn } from "type-graphql";
import { MercuriusContext } from "mercurius";

import { AppError, codes, errors } from "@shared/errors";
import { isInterfaceFastifyError } from "@shared/utils/is-interface-fastify-error";

export const ensureAuthenticated: MiddlewareFn<MercuriusContext> = async (
  { context },
  next
) => {
  try {
    await context.reply.request.jwtVerify();
  } catch (error) {
    if (
      isInterfaceFastifyError(error) &&
      error.code === "FST_JWT_NO_AUTHORIZATION_IN_HEADER"
    ) {
      throw new AppError(
        "Token not found.",
        codes.UNAUTHORIZED,
        errors.UNAUTHORIZED
      );
    }

    if (
      isInterfaceFastifyError(error) &&
      error.code === "FST_JWT_AUTHORIZATION_TOKEN_INVALID"
    ) {
      throw new AppError(
        "Invalid token.",
        codes.UNAUTHORIZED,
        errors.UNAUTHORIZED
      );
    }

    if (
      isInterfaceFastifyError(error) &&
      error.code === "FST_JWT_AUTHORIZATION_TOKEN_EXPIRED"
    ) {
      throw new AppError(
        "Expired token.",
        codes.UNAUTHORIZED,
        errors.UNAUTHORIZED
      );
    }

    throw new AppError(
      "Unauthorized.",
      codes.UNAUTHORIZED,
      errors.UNAUTHORIZED
    );
  }

  return next();
};
