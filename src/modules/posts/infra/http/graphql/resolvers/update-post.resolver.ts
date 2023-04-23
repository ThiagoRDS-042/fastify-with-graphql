import { z } from "zod";
import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";

import { PostModel } from "../models/post.model";
import { UpdatePostInput } from "../inputs/update-post.input";
import { makeUpdatePost } from "@modules/posts/use-cases/factories/make-update-post";
import { ensureAuthenticated } from "@shared/infra/http/graphql/middlewares/ensureAuthenticated";

@Resolver(() => PostModel)
export class UpdatePostResolver {
  @UseMiddleware(ensureAuthenticated)
  @Mutation(() => PostModel, { name: "updatePost" })
  public async execute(
    @Arg("updatePostInput") input: UpdatePostInput
  ): Promise<PostModel> {
    const updatePostInput = z.object({
      postId: z.string().uuid(),
      authorId: z.string().uuid(),
      title: z.string().min(3),
      content: z.string().min(3),
      category: z.enum(["social", "fashion", "technology", "games", "nature"]),
      description: z.string().nullable().optional(),
    });

    const { category, content, description, title, authorId, postId } =
      updatePostInput.parse(input);

    const updatePost = makeUpdatePost();

    const { post } = await updatePost.execute({
      category,
      content,
      description,
      title,
      authorId,
      postId,
    });

    return { post };
  }
}
