import { FastifyReply, FastifyRequest } from "fastify";

import { PostsDataLoader } from "@modules/posts/infra/http/graphql/dataloader";
import { AuthorsDataLoader } from "@modules/authors/infra/http/graphql/dataloader";

interface IContext {
  postsDataLoader: PostsDataLoader;
  authorsDataLoader: AuthorsDataLoader;
}

export const context = (
  _request: FastifyRequest,
  _reply: FastifyReply
): IContext => {
  return {
    postsDataLoader: new PostsDataLoader(),
    authorsDataLoader: new AuthorsDataLoader(),
  };
};
