import { NonEmptyArray } from "type-graphql";

import { CreateAuthorResolver } from "./create-author.resolver";
import { AuthenticateResolver } from "./authenticate.resolver";
import { ShowAuthorResolver } from "./show-author.resolver";
import { ListAuthorsResolver } from "./list-authors.resolver";
import { DeleteAuthorResolver } from "./delete-author.resolver";
import { UpdateAuthorResolver } from "./update-author.resolver";
import { PostsFieldResolver } from "./posts-field.resolver";

type AuthorResolversType = NonEmptyArray<
  | typeof CreateAuthorResolver
  | typeof AuthenticateResolver
  | typeof ShowAuthorResolver
  | typeof ListAuthorsResolver
  | typeof DeleteAuthorResolver
  | typeof UpdateAuthorResolver
  | typeof PostsFieldResolver
>;

export const authorResolvers: AuthorResolversType = [
  CreateAuthorResolver,
  AuthenticateResolver,
  ShowAuthorResolver,
  ListAuthorsResolver,
  DeleteAuthorResolver,
  UpdateAuthorResolver,
  PostsFieldResolver,
];
