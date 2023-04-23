import { UpdatePost } from "../update-post";
import { PrismaPostsRepository } from "@modules/posts/infra/http/prisma/repositories/prisma-posts-repository";
import { PrismaAuthorsRepository } from "@modules/authors/infra/prisma/repositories/prisma-authors-repository";

export const makeUpdatePost = (): UpdatePost => {
  const postsRepository = new PrismaPostsRepository();
  const authorsRepository = new PrismaAuthorsRepository();
  const updatePost = new UpdatePost(postsRepository, authorsRepository);

  return updatePost;
};
