import { Field, ObjectType } from "type-graphql";

import { Post } from "./post";

@ObjectType()
export class PostsModel {
  @Field(() => [Post])
  posts: Post[];
}
