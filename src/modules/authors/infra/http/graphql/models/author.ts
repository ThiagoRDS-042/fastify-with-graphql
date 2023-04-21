import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Author {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  password: string;

  @Field(() => String)
  phone: string;
}
