import { z } from "zod";
import { Arg, Mutation, Resolver } from "type-graphql";

import { AuthorModel } from "../models/author.model";
import { CreateAuthorInput } from "../inputs/create-author.input";
import { makeCreateAuthor } from "@modules/authors/use-cases/factories/make-create-author";

@Resolver(() => AuthorModel)
export class CreateAuthorResolver {
  @Mutation(() => AuthorModel, { name: "createAuthor" })
  public async execute(
    @Arg("createAuthorInput") input: CreateAuthorInput
  ): Promise<AuthorModel> {
    const createAuthorInput = z.object({
      email: z.string().email(),
      name: z.string().min(3),
      phone: z.string().min(8).regex(/^\d*$/, "Invalid phone number."),
      password: z.string().min(6),
    });

    const { email, name, password, phone } = createAuthorInput.parse(input);

    const createAuthor = makeCreateAuthor();

    const { author } = await createAuthor.execute({
      email,
      name,
      password,
      phone,
    });

    return { author };
  }
}
