import { prisma } from "@shared/infra/prisma";

import { Author } from "@modules/authors/entities/author.entity";
import { PrismaAuthorMapper } from "../mappers/prisma-authors-mapper";
import {
  AuthorsRepository,
  IOpions,
} from "@modules/authors/repositories/authors-repository";

export class PrismaAuthorsRepository implements AuthorsRepository {
  public async create(author: Author): Promise<void> {
    const raw = PrismaAuthorMapper.toPrisma(author);

    await prisma.author.create({
      data: raw,
    });
  }

  public async save(author: Author): Promise<void> {
    const raw = PrismaAuthorMapper.toPrisma(author);

    await prisma.author.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }

  public async findById(authorId: string): Promise<Author | null> {
    const author = await prisma.author.findFirst({
      where: {
        id: { equals: authorId },
        deletedAt: {
          equals: null,
        },
      },
    });

    if (!author) {
      return null;
    }

    return PrismaAuthorMapper.toDomain(author);
  }

  public async findByEmail(email: string): Promise<Author | null> {
    const author = await prisma.author.findUnique({
      where: {
        email,
      },
    });

    if (!author) {
      return null;
    }

    return PrismaAuthorMapper.toDomain(author);
  }

  public async findMany(options?: IOpions): Promise<Author[]> {
    const { emailContains, nameContains } = options;

    const authors = await prisma.author.findMany({
      where: {
        email: {
          contains: emailContains,
          mode: "insensitive",
        },
        name: {
          contains: nameContains,
          mode: "insensitive",
        },
      },
    });

    return authors.map(PrismaAuthorMapper.toDomain);
  }
}
