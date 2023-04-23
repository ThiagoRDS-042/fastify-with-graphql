import { FieldResolver, Resolver, Root } from "type-graphql";

import { Author } from "../models/author";
import { Post } from "@modules/posts/infra/http/graphql/models/post";
import { makeListPosts } from "@modules/posts/use-cases/factories/make-list-posts";

@Resolver(() => Author)
export class PostsFieldResolver {
  @FieldResolver(() => [Post], { name: "posts" })
  public async execute(@Root() author: Author): Promise<Post[]> {
    const { id } = author;

    const listPosts = makeListPosts();

    const { posts } = await listPosts.execute({
      authorIdEquals: id,
    });

    return posts;
  }
}
