import { z } from "zod";
import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";

import { AppError, codes, errors } from "@shared/errors";
import { ActivePostInput } from "../inputs/active-post.input";
import { authorIsPostOwns } from "@shared/utils/author-is-post-owns";
import { CurrentAuthor } from "@shared/infra/http/graphql/decorators/current-author";
import { makeActivePost } from "@modules/posts/use-cases/factories/make-active-post";
import type { ICurrentAuthor } from "@shared/infra/http/graphql/decorators/current-author";
import { ensureAuthenticated } from "@shared/infra/http/graphql/middlewares/ensureAuthenticated";

@Resolver(() => Boolean)
export class ActivePostResolver {
  @UseMiddleware(ensureAuthenticated)
  @Mutation(() => Boolean, { name: "activePost" })
  public async execute(
    @Arg("activePostInput") input: ActivePostInput,
    @CurrentAuthor() currentAuthor: ICurrentAuthor
  ): Promise<boolean> {
    const activePostInput = z.object({
      postId: z.string().uuid(),
    });

    const authorAuthenticated = z.object({
      sub: z.string().uuid(),
    });

    const { postId } = activePostInput.parse(input);

    const { sub: authorId } = authorAuthenticated.parse(currentAuthor);

    const authorIsOwner = await authorIsPostOwns(authorId, postId);

    if (!authorIsOwner) {
      throw new AppError(
        "Author is not a post owner.",
        codes.FORBIDDEN,
        errors.FORBIDDEN
      );
    }

    const activePost = makeActivePost();

    await activePost.execute({
      postId,
    });

    return true;
  }
}
