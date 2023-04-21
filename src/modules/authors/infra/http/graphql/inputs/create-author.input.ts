import { Field, InputType } from "type-graphql";

@InputType()
export class CreateAuthorInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  phone: string;
}
