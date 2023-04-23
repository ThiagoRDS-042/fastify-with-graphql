import { Field, ID, InputType } from "type-graphql";

import { PostCategoryEnum } from "../models/post";

@InputType()
export class UpdatePostInput {
  @Field(() => ID)
  postId: string;

  @Field(() => ID)
  authorId: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => PostCategoryEnum)
  category: PostCategoryEnum;

  @Field(() => String, { nullable: true })
  description?: string;
}
