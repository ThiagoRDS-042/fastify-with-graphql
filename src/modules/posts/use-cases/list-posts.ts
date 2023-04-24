import { Post, PostCategoryType } from "../entities/post.entity";
import { PostsRepository } from "../repositories/posts-repository";

interface IParams {
  titleContains?: string;
  tagEquals?: string;
  categoryEquals?: PostCategoryType;
  publish?: boolean;
  isActive?: boolean;
  authorIdEquals?: string;
}

interface IResponse {
  posts: Post[];
}

export class ListPosts {
  constructor(private readonly postsRepository: PostsRepository) {}

  public async execute(params: IParams): Promise<IResponse> {
    const {
      authorIdEquals,
      categoryEquals,
      publish,
      tagEquals,
      titleContains,
      isActive,
    } = params;

    const posts = await this.postsRepository.findMany({
      authorIdEquals,
      categoryEquals,
      publish,
      tagEquals,
      titleContains,
      isActive,
    });

    return { posts };
  }
}
