import { Authenticate } from "../authenticate";
import { PrismaAuthorsRepository } from "@modules/authors/infra/prisma/repositories/prisma-authors-repository";

export const makeAuthenticate = (): Authenticate => {
  const authorRepository = new PrismaAuthorsRepository();
  const authenticate = new Authenticate(authorRepository);

  return authenticate;
};
