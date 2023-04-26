import { z } from "zod";
import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";

import { AuthorModel } from "../models/author.model";
import { UpdateAuthorInput } from "../inputs/update-author.input";
import { CurrentAuthor } from "@shared/infra/http/graphql/decorators/current-author";
import type { ICurrentAuthor } from "@shared/infra/http/graphql/decorators/current-author";
import { makeUpdateAuthor } from "@modules/authors/use-cases/factories/make-update-author";
import { ensureAuthenticated } from "@shared/infra/http/graphql/middlewares/ensureAuthenticated";

@Resolver(() => AuthorModel)
export class UpdateAuthorResolver {
  @UseMiddleware(ensureAuthenticated)
  @Mutation(() => AuthorModel, { name: "updateAuthor" })
  public async execute(
    @Arg("updateAuthorInput") input: UpdateAuthorInput,
    @CurrentAuthor() currentAuthor: ICurrentAuthor
  ): Promise<AuthorModel> {
    const updateAuthorInput = z.object({
      email: z.string().email(),
      name: z.string().min(3),
      phone: z.string().min(8).regex(/^\d*$/, "Invalid phone number."),
      password: z.string().min(6),
    });

    const authorAuthenticated = z.object({
      sub: z.string().uuid(),
    });

    const { email, name, password, phone } = updateAuthorInput.parse(input);

    const { sub: authorId } = authorAuthenticated.parse(currentAuthor);

    const updateAuthor = makeUpdateAuthor();

    const { author } = await updateAuthor.execute({
      authorId,
      email,
      name,
      password,
      phone,
    });

    return { author };
  }
}
