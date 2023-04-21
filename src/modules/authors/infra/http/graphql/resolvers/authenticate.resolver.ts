import { z } from "zod";
import { MercuriusContext } from "mercurius";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";

import { AuthenticateModel } from "../models/authenticate.model";
import { AuthenticateInput } from "../inputs/authenticate.input";
import { makeAuthenticate } from "@modules/authors/use-cases/factories/make-authenticate";

interface IResponse {
  accessToken: string;
}

@Resolver(() => AuthenticateModel)
export class AuthenticateResolver {
  @Mutation(() => AuthenticateModel, { name: "authenticate" })
  public async execute(
    @Arg("authenticateInput") input: AuthenticateInput,
    @Ctx() ctx: MercuriusContext
  ): Promise<IResponse> {
    const createAuthorInput = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { email, password } = createAuthorInput.parse(input);

    const authenticate = makeAuthenticate();

    const { author } = await authenticate.execute({
      email,
      password,
    });

    const accessToken = await ctx.reply.jwtSign(
      { name: author.name },
      {
        sign: {
          sub: author.id,
        },
      }
    );

    return { accessToken };
  }
}
