import { z } from "zod";
import { Mutation, Resolver, UseMiddleware } from "type-graphql";

import { makeDeleteAuthor } from "@modules/authors/use-cases/factories/make-delete-author";
import {
  CurrentAuthor,
  ICurrentAuthor,
} from "@shared/infra/http/graphql/decorators/current-author";
import { ensureAuthenticated } from "@shared/infra/http/graphql/middlewares/ensureAuthenticated";
import { makeInactivePostsByAuthorId } from "@modules/posts/use-cases/factories/make-inactive-posts-by-author-id";

@Resolver(() => Boolean)
export class DeleteAuthorResolver {
  @UseMiddleware(ensureAuthenticated)
  @Mutation(() => Boolean, { name: "deleteAuthor" })
  public async execute(
    @CurrentAuthor() currentAuthor: ICurrentAuthor
  ): Promise<boolean> {
    const authorAuthenticated = z.object({
      sub: z.string().uuid(),
    });

    const { sub: authorId } = authorAuthenticated.parse(currentAuthor);

    const deleteAuthor = makeDeleteAuthor();

    await deleteAuthor.execute({
      authorId,
    });

    const inactivePostsByAuthorId = makeInactivePostsByAuthorId();

    await inactivePostsByAuthorId.execute({
      authorId,
    });

    return true;
  }
}
