import { FieldResolver, Resolver, Root } from "type-graphql";

import { Post } from "../models/post";
import { Author } from "@modules/authors/infra/http/graphql/models/author";
import { makeShowAuthor } from "@modules/authors/use-cases/factories/make-show-author";

@Resolver(() => Post)
export class AuthorFieldResolver {
  @FieldResolver(() => Author, { name: "author" })
  public async execute(@Root() post: Post): Promise<Author> {
    const { authorId } = post;

    const showAuthor = makeShowAuthor();

    const { author } = await showAuthor.execute({
      authorId,
    });

    return author;
  }
}
