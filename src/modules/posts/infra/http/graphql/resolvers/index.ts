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
import { ListPostsAuthorResolver } from "./list-posts-author.resolver";

type PostResolversType = NonEmptyArray<
  | typeof CreatePostResolver
  | typeof ShowPostResolver
  | typeof PublishPostResolver
  | typeof DeprivePostResolver
  | typeof UpdatePostResolver
  | typeof ListPostsResolver
  | typeof ListPostsAuthorResolver
  | typeof AuthorFieldResolver
  | typeof ActivePostResolver
  | typeof InactivePostResolver
>;

export const postResolvers: PostResolversType = [
  CreatePostResolver,
  ShowPostResolver,
  PublishPostResolver,
  DeprivePostResolver,
  UpdatePostResolver,
  ListPostsResolver,
  ListPostsAuthorResolver,
  AuthorFieldResolver,
  ActivePostResolver,
  InactivePostResolver,
];
