import { z } from "zod";
import { Arg, Query, Resolver, UseMiddleware } from "type-graphql";

import { AuthorsModel } from "../models/authors.model";
import { ListAuthorsInput } from "../inputs/list-authors.input";
import { makeListAuthors } from "@modules/authors/use-cases/factories/make-list-authors";
import { ensureAuthenticated } from "@shared/infra/http/graphql/middlewares/ensureAuthenticated";

@Resolver(() => AuthorsModel)
export class ListAuthorsResolver {
  @UseMiddleware(ensureAuthenticated)
  @Query(() => AuthorsModel, { name: "listAuthors" })
  public async execute(
    @Arg("listAuthorsInput", { nullable: true }) input: ListAuthorsInput
  ): Promise<AuthorsModel> {
    const listAuthorsInput = z
      .object({
        nameContains: z.string().optional(),
        emailContains: z.string().optional(),
      })
      .optional();

    const options = listAuthorsInput.parse(input);

    let emailContains: string | undefined = undefined;
    let nameContains: string | undefined = undefined;

    if (options) {
      emailContains = options.emailContains;
      nameContains = options.nameContains;
    }

    const listAuthors = makeListAuthors();

    const { authors } = await listAuthors.execute({
      emailContains,
      nameContains,
    });

    return { authors };
  }
}
