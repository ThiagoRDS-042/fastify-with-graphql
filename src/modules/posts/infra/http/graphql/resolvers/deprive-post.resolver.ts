import { z } from "zod";
import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";

import { DeprivePostInput } from "../inputs/deprive-post.input";
import { makeDeprivePost } from "@modules/posts/use-cases/factories/make-deprive-post";
import { ensureAuthenticated } from "@shared/infra/http/graphql/middlewares/ensureAuthenticated";

@Resolver(() => Boolean)
export class DeprivePostResolver {
  @UseMiddleware(ensureAuthenticated)
  @Mutation(() => Boolean, { name: "deprivePost" })
  public async execute(
    @Arg("deprivePostInput") input: DeprivePostInput
  ): Promise<boolean> {
    const deprivePostInput = z.object({
      postId: z.string().uuid(),
    });

    const { postId } = deprivePostInput.parse(input);

    const deprivePost = makeDeprivePost();

    await deprivePost.execute({
      postId,
    });

    return true;
  }
}
