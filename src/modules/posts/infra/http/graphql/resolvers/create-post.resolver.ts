import { z } from "zod";
import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";

import { PostModel } from "../models/post.model";
import { CreatePostInput } from "../inputs/create-post.input";
import { makeCreatePost } from "@modules/posts/use-cases/factories/make-create-post";
import {
  CurrentAuthor,
  ICurrentAuthor,
} from "@shared/infra/http/graphql/decorators/current-author";
import { ensureAuthenticated } from "@shared/infra/http/graphql/middlewares/ensureAuthenticated";

@Resolver(() => PostModel)
export class CreatePostResolver {
  @UseMiddleware(ensureAuthenticated)
  @Mutation(() => PostModel, { name: "createPost" })
  public async execute(
    @Arg("createPostInput") input: CreatePostInput,
    @CurrentAuthor() currentAuthor: ICurrentAuthor
  ): Promise<PostModel> {
    const createPostInput = z.object({
      title: z.string().min(3),
      content: z.string().min(3),
      category: z.enum(["social", "fashion", "technology", "games", "nature"]),
      description: z.string().nullable().optional(),
    });

    const authorAuthenticated = z.object({
      sub: z.string().uuid(),
    });

    const { category, content, description, title } =
      createPostInput.parse(input);

    const { sub: authorId } = authorAuthenticated.parse(currentAuthor);

    const createPost = makeCreatePost();

    const { post } = await createPost.execute({
      category,
      content,
      description,
      title,
      authorId,
    });

    return { post };
  }
}
