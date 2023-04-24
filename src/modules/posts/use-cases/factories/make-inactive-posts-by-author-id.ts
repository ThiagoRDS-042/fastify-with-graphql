import { InactivePostsByAuthorId } from "../inative-posts-by-author-id";
import { PrismaPostsRepository } from "@modules/posts/infra/http/prisma/repositories/prisma-posts-repository";

export const makeInactivePostsByAuthorId = (): InactivePostsByAuthorId => {
  const postsRepository = new PrismaPostsRepository();
  const inactivePostsByAuthorId = new InactivePostsByAuthorId(postsRepository);

  return inactivePostsByAuthorId;
};
