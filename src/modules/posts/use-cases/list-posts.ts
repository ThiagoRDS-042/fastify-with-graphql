import { Post, PostCategoryType } from "../entities/post.entity";
import { PostsRepository } from "../repositories/posts-repository";

interface IParams {
  titleContains?: string;
  tagEquals?: string;
  categoryEquals?: PostCategoryType;
  publish?: boolean;
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
    } = params;

    const posts = await this.postsRepository.findMany({
      authorIdEquals,
      categoryEquals,
      publish,
      tagEquals,
      titleContains,
    });

    return { posts };
  }
}
