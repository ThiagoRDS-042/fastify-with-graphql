import { Field, InputType } from "type-graphql";

@InputType()
export class ListAuthorsInput {
  @Field(() => String, { nullable: true })
  nameContains?: string;

  @Field(() => String, { nullable: true })
  emailContains?: string;
}
