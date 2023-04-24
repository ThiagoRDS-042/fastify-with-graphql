import { ActivePost } from "../active-post";
import { PrismaPostsRepository } from "@modules/posts/infra/http/prisma/repositories/prisma-posts-repository";

export const makeActivePost = (): ActivePost => {
  const postsRepository = new PrismaPostsRepository();
  const activePost = new ActivePost(postsRepository);

  return activePost;
};
