import { CreatePost } from "../create-post";
import { PrismaPostsRepository } from "@modules/posts/infra/http/prisma/repositories/prisma-posts-repository";
import { PrismaAuthorsRepository } from "@modules/authors/infra/prisma/repositories/prisma-authors-repository";

export const makeCreatePost = (): CreatePost => {
  const postsRepository = new PrismaPostsRepository();
  const authorsRepository = new PrismaAuthorsRepository();
  const createPost = new CreatePost(postsRepository, authorsRepository);

  return createPost;
};
