import { prisma } from "@shared/infra/prisma";

import { Post } from "@modules/posts/entities/post.entity";
import { PrismaPostMapper } from "../mappers/prisma-posts-mapper";
import {
  IOptions,
  PostsRepository,
} from "@modules/posts/repositories/posts-repository";

export class PrismaPostsRepository implements PostsRepository {
  public async create(post: Post): Promise<void> {
    const raw = PrismaPostMapper.toPrisma(post);

    await prisma.post.create({ data: raw });
  }

  public async save(post: Post): Promise<void> {
    const raw = PrismaPostMapper.toPrisma(post);

    await prisma.post.update({ data: raw, where: { id: raw.id } });
  }

  public async findById(postId: string): Promise<Post | null> {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return null;
    }

    return PrismaPostMapper.toDomain(post);
  }

  public async findByTag(tag: string): Promise<Post | null> {
    const post = await prisma.post.findUnique({
      where: { tag: tag },
    });

    if (!post) {
      return null;
    }

    return PrismaPostMapper.toDomain(post);
  }

  public async findMany(options?: IOptions): Promise<Post[]> {
    const {
      authorIdEquals,
      categoryEquals,
      publish,
      tagEquals,
      titleContains,
    } = options;

    let publishedAt = undefined;

    if (publish !== undefined && publish === true) {
      publishedAt = {
        not: {
          equals: null,
        },
      };
    }

    if (publish !== undefined && publish === false) {
      publishedAt = {
        equals: null,
      };
    }

    const posts = await prisma.post.findMany({
      where: {
        authorId: {
          equals: authorIdEquals,
        },
        category: {
          equals: categoryEquals,
        },
        tag: {
          equals: tagEquals,
        },
        title: {
          equals: titleContains,
        },
        publishedAt,
      },
    });

    return posts.map(PrismaPostMapper.toDomain);
  }
}
