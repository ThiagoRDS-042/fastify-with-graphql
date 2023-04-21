import { Field, ObjectType } from "type-graphql";

import { Author } from "./author";

@ObjectType()
export class AuthorModel {
  @Field(() => Author)
  author: Author;
}
