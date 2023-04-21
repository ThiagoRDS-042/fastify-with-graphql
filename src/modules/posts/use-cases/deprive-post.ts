import { AppError, errors, codes } from "@shared/errors";
import { PostsRepository } from "../repositories/posts-repository";

interface IParams {
  postId: string;
}

export class DeprivePost {
  constructor(private readonly postsRepository: PostsRepository) {}

  public async execute(params: IParams): Promise<void> {
    const { postId } = params;

    const post = await this.postsRepository.findById(postId);

    if (post === null) {
      throw new AppError(
        "Post does not exist.",
        codes.RESOURCE_NOT_FOUND,
        errors.NOT_FOUND
      );
    }

    if (!post.publishedAt) {
      throw new AppError(
        "Post already is deprived.",
        codes.FORBIDDEN,
        errors.FORBIDDEN
      );
    }

    post.deprive();

    await this.postsRepository.save(post);
  }
}
