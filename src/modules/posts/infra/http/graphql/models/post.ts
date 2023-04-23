import { Field, ID, ObjectType, registerEnumType } from "type-graphql";

import { PostCategoryType } from "@modules/posts/entities/post.entity";
import { Author } from "@modules/authors/infra/http/graphql/models/author";

export enum PostCategoryEnum {
  social = "social",
  fashion = "fashion",
  technology = "technology",
  games = "games",
  nature = "nature",
}

registerEnumType(PostCategoryEnum, {
  name: "PostCategoryEnum",
  description: "Available post categories on model",
});

@ObjectType()
export class Post {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => String)
  tag: string;

  @Field(() => String)
  authorId: string;

  @Field(() => PostCategoryEnum)
  category: PostCategoryType;

  @Field(() => Date, { nullable: true })
  publishedAt?: Date | null;

  @Field(() => Author)
  author?: Author;
}
