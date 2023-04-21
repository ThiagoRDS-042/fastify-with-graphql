import { Field, ObjectType } from "type-graphql";

import { Author } from "./author";

@ObjectType()
export class AuthorsModel {
  @Field(() => [Author])
  authors: Author[];
}
