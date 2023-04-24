import { Post as rawPost } from "@prisma/client";

import { Post } from "@modules/posts/entities/post.entity";

export class PrismaPostMapper {
  public static toPrisma(post: Post): rawPost {
    return {
      id: post.id,
      authorId: post.authorId,
      category: post.category,
      content: post.content,
      description: post.description,
      tag: post.tag,
      title: post.title,
      isActive: post.isActive,
      publishedAt: post.publishedAt,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  }

  public static toDomain(raw: rawPost): Post {
    return Post.newPost(
      {
        authorId: raw.authorId,
        category: raw.category,
        content: raw.content,
        description: raw.description,
        tag: raw.tag,
        title: raw.title,
        isActive: raw.isActive,
        publishedAt: raw.publishedAt,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id
    );
  }
}
