import { ShowPost } from "../show-post";
import { PrismaPostsRepository } from "@modules/posts/infra/prisma/repositories/prisma-posts-repository";

export const makeShowPost = (): ShowPost => {
  const postsRepository = new PrismaPostsRepository();
  const showPost = new ShowPost(postsRepository);

  return showPost;
};
