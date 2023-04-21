import { Field, ID, InputType } from "type-graphql";

@InputType()
export class DeleteAuthorInput {
  @Field(() => ID)
  authorId: string;
}
