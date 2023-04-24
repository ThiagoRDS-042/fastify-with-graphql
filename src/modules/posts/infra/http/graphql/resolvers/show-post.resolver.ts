import { z } from "zod";
import { Arg, Query, Resolver, UseMiddleware } from "type-graphql";

import { PostModel } from "../models/post.model";
import { AppError, codes, errors } from "@shared/errors";
import { ShowPostInput } from "../inputs/show-post.input";
import { makeShowPost } from "@modules/posts/use-cases/factories/make-show-post";
import { ensureAuthenticated } from "@shared/infra/http/graphql/middlewares/ensureAuthenticated";
import {
  CurrentAuthor,
  ICurrentAuthor,
} from "@shared/infra/http/graphql/decorators/current-author";

@Resolver(() => PostModel)
export class ShowPostResolver {
  @UseMiddleware(ensureAuthenticated)
  @Query(() => PostModel, { name: "showPost" })
  public async execute(
    @Arg("showPostInput") input: ShowPostInput,
    @CurrentAuthor() currentAuthor: ICurrentAuthor
  ): Promise<PostModel> {
    const showPostInput = z.object({
      postId: z.string().uuid(),
    });

    const authorAuthenticated = z.object({
      sub: z.string().uuid(),
    });

    const { postId } = showPostInput.parse(input);

    const { sub: authorId } = authorAuthenticated.parse(currentAuthor);

    const showPost = makeShowPost();

    const { post } = await showPost.execute({
      postId,
    });

    if (
      (post.publishedAt === null || !post.isActive) &&
      post.authorId !== authorId
    ) {
      throw new AppError(
        "Author is not a post owner.",
        codes.FORBIDDEN,
        errors.FORBIDDEN
      );
    }

    return { post };
  }
}
