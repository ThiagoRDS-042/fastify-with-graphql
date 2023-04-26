import { z } from "zod";
import { Arg, Query, Resolver, UseMiddleware } from "type-graphql";

import { PostsModel } from "../models/posts.model";
import { ListPostsInput } from "../inputs/list-posts.input";
import type { PostCategoryType } from "@modules/posts/entities/post.entity";
import { makeListPosts } from "@modules/posts/use-cases/factories/make-list-posts";
import { ensureAuthenticated } from "@shared/infra/http/graphql/middlewares/ensureAuthenticated";

@Resolver(() => PostsModel)
export class ListPostsResolver {
  @UseMiddleware(ensureAuthenticated)
  @Query(() => PostsModel, { name: "listPosts" })
  public async execute(
    @Arg("listPostsInput", { nullable: true }) input: ListPostsInput
  ): Promise<PostsModel> {
    const listPostsInput = z
      .object({
        titleContains: z.string().optional(),
        tagEquals: z.string().optional(),
        categoryEquals: z
          .enum(["social", "fashion", "technology", "games", "nature"])
          .optional(),
        authorIdEquals: z.string().uuid().optional(),
      })
      .optional();

    const options = listPostsInput.parse(input);

    let authorIdEquals: string | undefined = undefined;
    let categoryEquals: PostCategoryType | undefined = undefined;
    let tagEquals: string | undefined = undefined;
    let titleContains: string | undefined = undefined;

    if (options) {
      authorIdEquals = options.authorIdEquals;
      categoryEquals = options.categoryEquals;
      tagEquals = options.tagEquals;
      titleContains = options.titleContains;
    }

    const listPosts = makeListPosts();

    const { posts } = await listPosts.execute({
      authorIdEquals,
      categoryEquals,
      tagEquals,
      titleContains,
      publish: true,
      isActive: true,
    });

    return { posts };
  }
}
