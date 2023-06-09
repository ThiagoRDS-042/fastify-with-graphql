import { Field, ID, InputType } from "type-graphql";

import { PostCategoryEnum } from "../models/post";
import type { PostCategoryType } from "@modules/posts/entities/post.entity";

@InputType()
export class ListPostsInput {
  @Field(() => ID, { nullable: true })
  authorIdEquals?: string;

  @Field(() => PostCategoryEnum, { nullable: true })
  categoryEquals?: PostCategoryType;

  @Field(() => String, { nullable: true })
  tagEquals?: string;

  @Field(() => String, { nullable: true })
  titleContains?: string;
}
