import { PrismaPostsRepository } from "@modules/posts/infra/prisma/repositories/prisma-posts-repository";

export const authorIsPostOwns = async (
  authorId: string,
  postId: string
): Promise<boolean> => {
  const postsRepository = new PrismaPostsRepository();

  const post = await postsRepository.findById(postId);

  if (post === null) {
    return false;
  }

  return post.authorId === authorId;
};
