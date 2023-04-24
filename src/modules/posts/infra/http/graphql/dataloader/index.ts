import DataLoader from "dataloader";

import { Post } from "@modules/posts/entities/post.entity";
import { PostsRepository } from "@modules/posts/repositories/posts-repository";
import { PrismaPostsRepository } from "../../prisma/repositories/prisma-posts-repository";

export class PostsDataLoader {
  private readonly postsRepository: PostsRepository;

  constructor() {
    this.postsRepository = new PrismaPostsRepository();
  }

  public async listByAuthorId(authorId: string): Promise<Post[]> {
    return this.listByAuthorIdLoader.load(authorId);
  }

  private listByAuthorIdLoader = new DataLoader(
    async (authorIds: readonly string[]) => {
      const posts = await this.postsRepository.findIn(
        authorIds.map((authorId) => authorId)
      );

      return authorIds.map((authorId) =>
        posts.filter((post) => post.authorId === authorId)
      );
    }
  );
}
