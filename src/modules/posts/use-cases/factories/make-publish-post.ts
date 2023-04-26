import { PublishPost } from "../publish-post";
import { PrismaPostsRepository } from "@modules/posts/infra/prisma/repositories/prisma-posts-repository";

export const makePublishPost = (): PublishPost => {
  const postsRepository = new PrismaPostsRepository();
  const publishPost = new PublishPost(postsRepository);

  return publishPost;
};
