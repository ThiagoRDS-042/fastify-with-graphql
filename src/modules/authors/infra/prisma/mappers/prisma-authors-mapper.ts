import { Author as rawAuthor } from "@prisma/client";

import { Author } from "@modules/authors/entities/author.entity";

export class PrismaAuthorMapper {
  public static toPrisma(author: Author): rawAuthor {
    return {
      id: author.id,
      email: author.email,
      name: author.name,
      password: author.password,
      phone: author.phone,
      createdAt: author.createdAt,
      updatedAt: author.updatedAt,
      deletedAt: author.deletedAt,
    };
  }

  public static toDomain(raw: rawAuthor): Author {
    return Author.newAuthor(
      {
        email: raw.email,
        name: raw.name,
        password: raw.password,
        phone: raw.phone,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
      },
      raw.id
    );
  }
}
