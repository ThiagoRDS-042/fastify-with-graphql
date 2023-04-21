import { z } from "zod";
import { Query, Resolver, UseMiddleware } from "type-graphql";

import { AuthorModel } from "../models/author.model";
import { makeShowAuthor } from "@modules/authors/use-cases/factories/make-show-author";
import { ensureAuthenticated } from "@shared/infra/http/graphql/middlewares/ensureAuthenticated";
import {
  CurrentAuthor,
  ICurrentAuthor,
} from "@shared/infra/http/graphql/decorators/current-author";

@Resolver(() => AuthorModel)
export class ShowAuthorResolver {
  @UseMiddleware(ensureAuthenticated)
  @Query(() => AuthorModel, { name: "showAuthor" })
  public async execute(
    @CurrentAuthor() currentAuthor: ICurrentAuthor
  ): Promise<AuthorModel> {
    const authorAuthenticated = z.object({
      sub: z.string().uuid(),
    });

    const { sub: authorId } = authorAuthenticated.parse(currentAuthor);

    const showAuthor = makeShowAuthor();

    const { author } = await showAuthor.execute({
      authorId,
    });

    return { author };
  }
}
