import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class AuthenticateModel {
  @Field(() => ID)
  accessToken: string;
}
