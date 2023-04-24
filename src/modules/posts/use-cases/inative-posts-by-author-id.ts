import { PostsRepository } from "../repositories/posts-repository";

interface IParams {
  authorId: string;
}

export class InactivePostsByAuthorId {
  constructor(private readonly postsRepository: PostsRepository) {}

  public async execute(params: IParams): Promise<void> {
    const { authorId } = params;

    const posts = await this.postsRepository.findMany({
      authorIdEquals: authorId,
    });

    await Promise.all(
      posts.map((post) => {
        post.inactive();

        return this.postsRepository.save(post);
      })
    );
  }
}
