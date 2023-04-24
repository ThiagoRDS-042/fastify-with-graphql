import { Field, ID, InputType } from "type-graphql";

@InputType()
export class ActivePostInput {
  @Field(() => ID)
  postId: string;
}
