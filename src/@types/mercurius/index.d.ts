import "mercurius";

import { PostsDataLoader } from "@modules/posts/infra/http/graphql/dataloader";

declare module "mercurius" {
  export interface MercuriusContext {
    postsDataLoader: PostsDataLoader;
  }
}
