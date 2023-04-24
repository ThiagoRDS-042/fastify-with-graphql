import { z } from "zod";
import { Arg, Query, Resolver, UseMiddleware } from "type-graphql";

import { PostsModel } from "../models/posts.model";
import { AppError, codes, errors } from "@shared/errors";
import { PostCategoryType } from "@modules/posts/entities/post.entity";
import { ListPostsAuthorInput } from "../inputs/list-posts-author.input";
import { makeListPosts } from "@modules/posts/use-cases/factories/make-list-posts";
import { ensureAuthenticated } from "@shared/infra/http/graphql/middlewares/ensureAuthenticated";
import {
  CurrentAuthor,
  ICurrentAuthor,
} from "@shared/infra/http/graphql/decorators/current-author";

@Resolver(() => PostsModel)
export class ListPostsAuthorResolver {
  @UseMiddleware(ensureAuthenticated)
  @Query(() => PostsModel, { name: "listPostsAuthor" })
  public async execute(
    @Arg("listPostsAuthorInput") input: ListPostsAuthorInput,
    @CurrentAuthor() currentAuthor: ICurrentAuthor
  ): Promise<PostsModel> {
    const listPostsAuthorInput = z.object({
      titleContains: z.string().optional(),
      tagEquals: z.string().optional(),
      publish: z.boolean().optional(),
      isActive: z.boolean().optional(),
      categoryEquals: z
        .enum(["social", "fashion", "technology", "games", "nature"])
        .optional(),
      authorIdEquals: z.string().uuid(),
    });

    const authorAuthenticated = z.object({
      sub: z.string().uuid(),
    });

    const { authorIdEquals, ...options } = listPostsAuthorInput.parse(input);

    const { sub: authorId } = authorAuthenticated.parse(currentAuthor);

    if (authorIdEquals !== authorId) {
      throw new AppError(
        "Author is not a posts owner.",
        codes.FORBIDDEN,
        errors.FORBIDDEN
      );
    }

    let categoryEquals: PostCategoryType | undefined = undefined;
    let tagEquals: string | undefined = undefined;
    let titleContains: string | undefined = undefined;
    let publish: boolean | undefined = undefined;
    let isActive: boolean | undefined = undefined;

    if (options) {
      categoryEquals = options.categoryEquals;
      tagEquals = options.tagEquals;
      titleContains = options.titleContains;
      publish = options.publish;
      isActive = options.isActive;
    }

    const listPosts = makeListPosts();

    const { posts } = await listPosts.execute({
      authorIdEquals,
      categoryEquals,
      tagEquals,
      titleContains,
      publish,
      isActive,
    });

    return { posts };
  }
}
