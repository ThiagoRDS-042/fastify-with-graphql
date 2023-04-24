import { InactivePost } from "../inactive-post";
import { PrismaPostsRepository } from "@modules/posts/infra/http/prisma/repositories/prisma-posts-repository";

export const makeInactivePost = (): InactivePost => {
  const postsRepository = new PrismaPostsRepository();
  const inactivePost = new InactivePost(postsRepository);

  return inactivePost;
};
