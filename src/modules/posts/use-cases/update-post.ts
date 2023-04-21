import slugify from "slugify";

import { AppError, errors, codes } from "@shared/errors";
import { Post, PostCategoryType } from "../entities/post.entity";
import { PostsRepository } from "../repositories/posts-repository";
import { AuthorsRepository } from "@modules/authors/repositories/authors-repository";

interface IParams {
  authorId: string;
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
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly authorsRepository: AuthorsRepository
  ) {}

  public async execute(params: IParams): Promise<IResponse> {
    const { category, content, title, description, authorId, postId } = params;

    const authorExist = await this.authorsRepository.findById(authorId);

    if (authorExist === null) {
      throw new AppError(
        "Author does not exist.",
        codes.RESOURCE_NOT_FOUND,
        errors.NOT_FOUND
      );
    }

    const postExist = await this.postsRepository.findById(postId);

    if (postExist === null) {
      throw new AppError(
        "Post does not exist.",
        codes.RESOURCE_NOT_FOUND,
        errors.NOT_FOUND
      );
    }

    if (postExist.authorId !== authorId) {
      throw new AppError(
        "Author is not the owner of the post.",
        codes.FORBIDDEN,
        errors.FORBIDDEN
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
        authorId,
      },
      postId
    );

    await this.postsRepository.save(post);

    return { post };
  }
}
