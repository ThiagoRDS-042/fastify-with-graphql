import { NonEmptyArray } from "type-graphql";

import { CreatePostResolver } from "./create-post.resolver";
import { ShowPostResolver } from "./show-post.resolver";
import { PublishPostResolver } from "./publish-post.resolver";
import { DeprivePostResolver } from "./deprive-post.resolver";
import { UpdatePostResolver } from "./update-post.resolver";
import { ListPostsResolver } from "./list-posts.resolver";

export const postResolvers: NonEmptyArray<
  | typeof CreatePostResolver
  | typeof ShowPostResolver
  | typeof PublishPostResolver
  | typeof DeprivePostResolver
  | typeof UpdatePostResolver
  | typeof ListPostsResolver
> = [
  CreatePostResolver,
  ShowPostResolver,
  PublishPostResolver,
  DeprivePostResolver,
  UpdatePostResolver,
  ListPostsResolver,
];
