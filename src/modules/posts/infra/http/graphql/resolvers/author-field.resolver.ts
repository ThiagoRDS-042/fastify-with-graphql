import { z } from "zod";
import { FieldResolver, Resolver, Root } from "type-graphql";

import { Post } from "../models/post";
import { Post as PostEntity } from "@modules/posts/entities/post.entity";
import { Author } from "@modules/authors/infra/http/graphql/models/author";
import { makeShowAuthor } from "@modules/authors/use-cases/factories/make-show-author";

@Resolver(() => Post)
export class AuthorFieldResolver {
  @FieldResolver(() => Author, { name: "author" })
  public async execute(@Root() post: PostEntity): Promise<Author> {
    const rootAuthorId = z.string().uuid();

    const authorId = rootAuthorId.parse(post.authorId);

    const showAuthor = makeShowAuthor();

    const { author } = await showAuthor.execute({
      authorId,
    });

    return author;
  }
}
