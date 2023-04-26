import { PrismaPostsRepository } from "@modules/posts/infra/prisma/repositories/prisma-posts-repository";

export const makePublishPost = async (postId: string): Promise<void> => {
  const postsRepository = new PrismaPostsRepository();

  const post = await postsRepository.findById(postId);

  if (post) {
    post.publish();
    await postsRepository.save(post);
  }
};
