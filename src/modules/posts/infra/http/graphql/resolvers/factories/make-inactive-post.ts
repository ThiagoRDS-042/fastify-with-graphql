import { PrismaPostsRepository } from "@modules/posts/infra/prisma/repositories/prisma-posts-repository";

export const makeInactivePost = async (postId: string): Promise<void> => {
  const postsRepository = new PrismaPostsRepository();

  const post = await postsRepository.findById(postId);

  if (post) {
    post.inactive();
    await postsRepository.save(post);
  }
};
