import slugify from "slugify";

import { Post } from "@modules/posts/entities/post.entity";
import { makePost } from "@modules/posts/repositories/in-memory/factories/make-post";
import { PrismaPostsRepository } from "@modules/posts/infra/prisma/repositories/prisma-posts-repository";

interface IResponse {
  post: Post;
}

export const makeCreatePost = async (authorId: string): Promise<IResponse> => {
  const postsRepository = new PrismaPostsRepository();

  const post = makePost({
    category: "games",
    content: "This is a test e2e content.",
    description: null,
    title: "This is a test e2e title.",
    tag: slugify("This is a test e2e title.", { lower: true }),
    isActive: true,
    authorId,
  });

  await postsRepository.create(post);

  return {
    post,
  };
};
