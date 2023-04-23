import { DeprivePost } from "../deprive-post";
import { PrismaPostsRepository } from "@modules/posts/infra/http/prisma/repositories/prisma-posts-repository";

export const makeDeprivePost = (): DeprivePost => {
  const postsRepository = new PrismaPostsRepository();
  const deprivePost = new DeprivePost(postsRepository);

  return deprivePost;
};
