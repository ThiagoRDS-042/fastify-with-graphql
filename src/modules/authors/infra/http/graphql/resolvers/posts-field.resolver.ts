import { z } from "zod";
import { MercuriusContext } from "mercurius";
import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";

import { Author } from "../models/author";
import { Author as AuthorEntity } from "@modules/authors/entities/author.entity";
import { Post } from "@modules/posts/infra/http/graphql/models/post";

@Resolver(() => Author)
export class PostsFieldResolver {
  @FieldResolver(() => [Post], { name: "posts" })
  public async execute(
    @Root() author: AuthorEntity,
    @Ctx() context: MercuriusContext
  ): Promise<Post[]> {
    const rootId = z.string().uuid();

    const authorIdEquals = rootId.parse(author.id);

    const { postsDataLoader } = context;

    const posts = await postsDataLoader.listByAuthorId(authorIdEquals);

    return posts;
  }
}
