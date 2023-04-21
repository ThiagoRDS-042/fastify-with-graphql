import { Field, InputType } from "type-graphql";

@InputType()
export class AuthenticateInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
