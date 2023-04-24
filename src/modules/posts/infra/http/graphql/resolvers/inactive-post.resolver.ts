import { z } from "zod";
import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";

import { AppError, codes, errors } from "@shared/errors";
import { InactivePostInput } from "../inputs/inactive-post.input";
import { authorIsPostOwns } from "@shared/utils/author-is-post-owns";
import { makeInactivePost } from "@modules/posts/use-cases/factories/make-inactive-post";
import { ensureAuthenticated } from "@shared/infra/http/graphql/middlewares/ensureAuthenticated";
import {
  CurrentAuthor,
  ICurrentAuthor,
} from "@shared/infra/http/graphql/decorators/current-author";

@Resolver(() => Boolean)
export class InactivePostResolver {
  @UseMiddleware(ensureAuthenticated)
  @Mutation(() => Boolean, { name: "inactivePost" })
  public async execute(
    @Arg("activePostInput") input: InactivePostInput,
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

    const inactivePost = makeInactivePost();

    await inactivePost.execute({
      postId,
    });

    return true;
  }
}
