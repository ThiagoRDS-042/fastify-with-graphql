import { Field, ID, InputType } from "type-graphql";

@InputType()
export class ShowPostInput {
  @Field(() => ID)
  postId: string;
}
