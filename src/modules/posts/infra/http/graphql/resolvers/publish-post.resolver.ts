import { z } from "zod";
import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";

import { PublishPostInput } from "../inputs/publish-post.input";
import { makePublishPost } from "@modules/posts/use-cases/factories/make-publish-post";
import { ensureAuthenticated } from "@shared/infra/http/graphql/middlewares/ensureAuthenticated";

@Resolver(() => Boolean)
export class PublishPostResolver {
  @UseMiddleware(ensureAuthenticated)
  @Mutation(() => Boolean, { name: "publishPost" })
  public async execute(
    @Arg("publishPostInput") input: PublishPostInput
  ): Promise<boolean> {
    const publishPostInput = z.object({
      postId: z.string().uuid(),
    });

    const { postId } = publishPostInput.parse(input);

    const publishPost = makePublishPost();

    await publishPost.execute({
      postId,
    });

    return true;
  }
}
