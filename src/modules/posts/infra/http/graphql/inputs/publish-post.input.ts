import { Field, ID, InputType } from "type-graphql";

@InputType()
export class PublishPostInput {
  @Field(() => ID)
  postId: string;
}
