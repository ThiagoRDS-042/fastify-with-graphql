import { Field, ID, InputType } from "type-graphql";

@InputType()
export class DeprivePostInput {
  @Field(() => ID)
  postId: string;
}
