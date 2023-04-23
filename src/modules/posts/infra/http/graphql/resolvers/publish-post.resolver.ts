import { z } from "zod";
import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";

import { AppError, codes, errors } from "@shared/errors";
import { PublishPostInput } from "../inputs/publish-post.input";
import { authorIsPostOwns } from "@shared/utils/author-is-post-owns";
import { makePublishPost } from "@modules/posts/use-cases/factories/make-publish-post";
import { ensureAuthenticated } from "@shared/infra/http/graphql/middlewares/ensureAuthenticated";
import {
  CurrentAuthor,
  ICurrentAuthor,
} from "@shared/infra/http/graphql/decorators/current-author";

@Resolver(() => Boolean)
export class PublishPostResolver {
  @UseMiddleware(ensureAuthenticated)
  @Mutation(() => Boolean, { name: "publishPost" })
  public async execute(
    @Arg("publishPostInput") input: PublishPostInput,
    @CurrentAuthor() currentAuthor: ICurrentAuthor
  ): Promise<boolean> {
    const publishPostInput = z.object({
      postId: z.string().uuid(),
    });

    const authorAuthenticated = z.object({
      sub: z.string().uuid(),
    });

    const { postId } = publishPostInput.parse(input);

    const { sub: authorId } = authorAuthenticated.parse(currentAuthor);

    const authorIsOwner = await authorIsPostOwns(authorId, postId);

    if (!authorIsOwner) {
      throw new AppError(
        "Author is not a post owner.",
        codes.FORBIDDEN,
        errors.FORBIDDEN
      );
    }

    const publishPost = makePublishPost();

    await publishPost.execute({
      postId,
    });

    return true;
  }
}
