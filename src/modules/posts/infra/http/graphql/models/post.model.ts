import { Field, ObjectType } from "type-graphql";

import { Post } from "./post";

@ObjectType()
export class PostModel {
  @Field(() => Post)
  post: Post;
}
