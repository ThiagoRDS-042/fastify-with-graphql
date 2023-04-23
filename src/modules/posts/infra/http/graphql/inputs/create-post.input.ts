import { Field, InputType } from "type-graphql";

import { PostCategoryEnum } from "../models/post";

@InputType()
export class CreatePostInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => PostCategoryEnum)
  category: PostCategoryEnum;

  @Field(() => String, { nullable: true })
  description?: string;
}
