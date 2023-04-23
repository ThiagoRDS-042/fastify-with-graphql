import { z } from "zod";
import { Arg, Query, Resolver, UseMiddleware } from "type-graphql";

import { PostModel } from "../models/post.model";
import { ShowPostInput } from "../inputs/show-post.input";
import { makeShowPost } from "@modules/posts/use-cases/factories/make-show-post";
import { ensureAuthenticated } from "@shared/infra/http/graphql/middlewares/ensureAuthenticated";

@Resolver(() => PostModel)
export class ShowPostResolver {
  @UseMiddleware(ensureAuthenticated)
  @Query(() => PostModel, { name: "showPost" })
  public async execute(
    @Arg("showPostInput") input: ShowPostInput
  ): Promise<PostModel> {
    const showPostInput = z.object({
      postId: z.string().uuid(),
    });

    const { postId } = showPostInput.parse(input);

    const showPost = makeShowPost();

    const { post } = await showPost.execute({
      postId,
    });

    return { post };
  }
}
