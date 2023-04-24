import { AppError, errors, codes } from "@shared/errors";
import { PostsRepository } from "../repositories/posts-repository";

interface IParams {
  postId: string;
}

export class InactivePost {
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

    if (!post.isActive) {
      throw new AppError(
        "Post already is inactive.",
        codes.FORBIDDEN,
        errors.FORBIDDEN
      );
    }

    post.inactive();

    await this.postsRepository.save(post);
  }
}
