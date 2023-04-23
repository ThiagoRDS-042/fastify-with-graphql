import { z } from "zod";
import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";

import { AppError, codes, errors } from "@shared/errors";
import { DeprivePostInput } from "../inputs/deprive-post.input";
import { authorIsPostOwns } from "@shared/utils/author-is-post-owns";
import { makeDeprivePost } from "@modules/posts/use-cases/factories/make-deprive-post";
import { ensureAuthenticated } from "@shared/infra/http/graphql/middlewares/ensureAuthenticated";
import {
  CurrentAuthor,
  ICurrentAuthor,
} from "@shared/infra/http/graphql/decorators/current-author";

@Resolver(() => Boolean)
export class DeprivePostResolver {
  @UseMiddleware(ensureAuthenticated)
  @Mutation(() => Boolean, { name: "deprivePost" })
  public async execute(
    @Arg("deprivePostInput") input: DeprivePostInput,
    @CurrentAuthor() currentAuthor: ICurrentAuthor
  ): Promise<boolean> {
    const deprivePostInput = z.object({
      postId: z.string().uuid(),
    });

    const authorAuthenticated = z.object({
      sub: z.string().uuid(),
    });

    const { postId } = deprivePostInput.parse(input);

    const { sub: authorId } = authorAuthenticated.parse(currentAuthor);

    const authorIsOwner = await authorIsPostOwns(authorId, postId);

    if (!authorIsOwner) {
      throw new AppError(
        "Author is not a post owner.",
        codes.FORBIDDEN,
        errors.FORBIDDEN
      );
    }

    const deprivePost = makeDeprivePost();

    await deprivePost.execute({
      postId,
    });

    return true;
  }
}
