import { z } from "zod";
import { FieldResolver, Resolver, Root } from "type-graphql";

import { Author } from "../models/author";
import { Author as AuthorEntity } from "@modules/authors/entities/author.entity";
import { Post } from "@modules/posts/infra/http/graphql/models/post";
import { makeListPosts } from "@modules/posts/use-cases/factories/make-list-posts";

@Resolver(() => Author)
export class PostsFieldResolver {
  @FieldResolver(() => [Post], { name: "posts" })
  public async execute(@Root() author: AuthorEntity): Promise<Post[]> {
    const rootId = z.string().uuid();

    const authorIdEquals = rootId.parse(author.id);

    const listPosts = makeListPosts();

    const { posts } = await listPosts.execute({
      authorIdEquals,
    });

    return posts;
  }
}
