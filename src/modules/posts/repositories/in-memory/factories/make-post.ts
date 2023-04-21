import { Post, PostProps } from "@modules/posts/entities/post.entity";
import slugify from "slugify";

type Override = Partial<PostProps>;

export const makePost = (override: Override = {}): Post => {
  return Post.newPost({
    authorId: "example-author-id",
    category: "games",
    content: "Random content",
    title: "This is a random title",
    tag: slugify("This is a random title", { lower: true }),
    description: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: null,
    ...override,
  });
};
