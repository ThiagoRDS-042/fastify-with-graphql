import { z } from "zod";
import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";

import { PostModel } from "../models/post.model";
import { AppError, codes, errors } from "@shared/errors";
import { UpdatePostInput } from "../inputs/update-post.input";
import { authorIsPostOwns } from "@shared/utils/author-is-post-owns";
import { makeUpdatePost } from "@modules/posts/use-cases/factories/make-update-post";
import { ensureAuthenticated } from "@shared/infra/http/graphql/middlewares/ensureAuthenticated";
import {
  CurrentAuthor,
  ICurrentAuthor,
} from "@shared/infra/http/graphql/decorators/current-author";

@Resolver(() => PostModel)
export class UpdatePostResolver {
  @UseMiddleware(ensureAuthenticated)
  @Mutation(() => PostModel, { name: "updatePost" })
  public async execute(
    @Arg("updatePostInput") input: UpdatePostInput,
    @CurrentAuthor() currentAuthor: ICurrentAuthor
  ): Promise<PostModel> {
    const updatePostInput = z.object({
      postId: z.string().uuid(),
      title: z.string().min(3),
      content: z.string().min(3),
      category: z.enum(["social", "fashion", "technology", "games", "nature"]),
      description: z.string().nullable().optional(),
    });

    const authorAuthenticated = z.object({
      sub: z.string().uuid(),
    });

    const { category, content, description, title, postId } =
      updatePostInput.parse(input);

    const { sub: authorId } = authorAuthenticated.parse(currentAuthor);

    const authorIsOwner = await authorIsPostOwns(authorId, postId);

    if (!authorIsOwner) {
      throw new AppError(
        "Author is not a post owner.",
        codes.FORBIDDEN,
        errors.FORBIDDEN
      );
    }

    const updatePost = makeUpdatePost();

    const { post } = await updatePost.execute({
      category,
      content,
      description,
      title,
      postId,
    });

    return { post };
  }
}
