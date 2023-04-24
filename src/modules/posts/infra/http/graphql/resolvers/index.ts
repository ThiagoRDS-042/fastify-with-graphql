import { NonEmptyArray } from "type-graphql";

import { CreatePostResolver } from "./create-post.resolver";
import { ShowPostResolver } from "./show-post.resolver";
import { PublishPostResolver } from "./publish-post.resolver";
import { DeprivePostResolver } from "./deprive-post.resolver";
import { UpdatePostResolver } from "./update-post.resolver";
import { ListPostsResolver } from "./list-posts.resolver";
import { AuthorFieldResolver } from "./author-field.resolver";
import { ActivePostResolver } from "./active-post.resolver";
import { InactivePostResolver } from "./inactive-post.resolver";

export const postResolvers: NonEmptyArray<
  | typeof CreatePostResolver
  | typeof ShowPostResolver
  | typeof PublishPostResolver
  | typeof DeprivePostResolver
  | typeof UpdatePostResolver
  | typeof ListPostsResolver
  | typeof AuthorFieldResolver
  | typeof ActivePostResolver
  | typeof InactivePostResolver
> = [
  CreatePostResolver,
  ShowPostResolver,
  PublishPostResolver,
  DeprivePostResolver,
  UpdatePostResolver,
  ListPostsResolver,
  AuthorFieldResolver,
  ActivePostResolver,
  InactivePostResolver,
];
