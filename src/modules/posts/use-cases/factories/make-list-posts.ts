import { ListPosts } from "../list-posts";
import { PrismaPostsRepository } from "@modules/posts/infra/http/prisma/repositories/prisma-posts-repository";

export const makeListPosts = (): ListPosts => {
  const postsRepository = new PrismaPostsRepository();
  const listPosts = new ListPosts(postsRepository);

  return listPosts;
};
