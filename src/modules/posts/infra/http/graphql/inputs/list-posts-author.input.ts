import { Field, ID, InputType } from "type-graphql";

import { PostCategoryEnum } from "../models/post";
import { PostCategoryType } from "@modules/posts/entities/post.entity";

@InputType()
export class ListPostsAuthorInput {
  @Field(() => ID)
  authorIdEquals: string;

  @Field(() => PostCategoryEnum, { nullable: true })
  categoryEquals?: PostCategoryType;

  @Field(() => Boolean, { nullable: true })
  publish?: string;

  @Field(() => Boolean, { nullable: true })
  isActive?: string;

  @Field(() => String, { nullable: true })
  tagEquals?: string;

  @Field(() => String, { nullable: true })
  titleContains?: string;
}
