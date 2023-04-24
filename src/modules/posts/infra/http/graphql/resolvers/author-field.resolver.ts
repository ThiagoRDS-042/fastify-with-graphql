import { z } from "zod";
import { MercuriusContext } from "mercurius";
import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";

import { Post } from "../models/post";
import { Post as PostEntity } from "@modules/posts/entities/post.entity";
import { Author } from "@modules/authors/infra/http/graphql/models/author";

@Resolver(() => Post)
export class AuthorFieldResolver {
  @FieldResolver(() => Author, { name: "author" })
  public async execute(
    @Root() post: PostEntity,
    @Ctx() context: MercuriusContext
  ): Promise<Author> {
    const rootAuthorId = z.string().uuid();

    const authorId = rootAuthorId.parse(post.authorId);

    const { authorsDataLoader } = context;

    const author = await authorsDataLoader.getById(authorId);

    return author;
  }
}
