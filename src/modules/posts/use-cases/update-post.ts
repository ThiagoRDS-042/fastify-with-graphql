import slugify from "slugify";

import { AppError, errors, codes } from "@shared/errors";
import { Post, PostCategoryType } from "../entities/post.entity";
import { PostsRepository } from "../repositories/posts-repository";

interface IParams {
  postId: string;
  title: string;
  content: string;
  category: PostCategoryType;
  description?: string;
}

interface IResponse {
  post: Post;
}

export class UpdatePost {
  constructor(private readonly postsRepository: PostsRepository) {}

  public async execute(params: IParams): Promise<IResponse> {
    const { category, content, title, description, postId } = params;

    const postExist = await this.postsRepository.findById(postId);

    if (postExist === null) {
      throw new AppError(
        "Post does not exist.",
        codes.RESOURCE_NOT_FOUND,
        errors.NOT_FOUND
      );
    }

    const tag = slugify(title, { lower: true });

    const postAlreadyExist = await this.postsRepository.findByTag(tag);

    if (postAlreadyExist && postAlreadyExist.id !== postExist.id) {
      throw new AppError(
        "Post does already exist.",
        codes.RESOURCE_ALREADY_USED,
        errors.CONFLICT
      );
    }

    const post = Post.newPost(
      {
        category,
        content,
        title,
        description,
        tag,
        isActive: postExist.isActive,
        authorId: postExist.authorId,
        publishedAt: postExist.publishedAt,
      },
      postId
    );

    await this.postsRepository.save(post);

    return { post };
  }
}
