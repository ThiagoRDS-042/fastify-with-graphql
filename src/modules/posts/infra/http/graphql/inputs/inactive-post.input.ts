import { Field, ID, InputType } from "type-graphql";

@InputType()
export class InactivePostInput {
  @Field(() => ID)
  postId: string;
}
