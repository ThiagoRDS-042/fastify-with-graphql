import { UpdatePost } from "../update-post";
import { PrismaPostsRepository } from "@modules/posts/infra/http/prisma/repositories/prisma-posts-repository";

export const makeUpdatePost = (): UpdatePost => {
  const postsRepository = new PrismaPostsRepository();
  const updatePost = new UpdatePost(postsRepository);

  return updatePost;
};
