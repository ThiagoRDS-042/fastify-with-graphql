import { CreateAuthor } from "@modules/authors/use-cases/create-author";
import { PrismaAuthorsRepository } from "../../infra/prisma/repositories/prisma-authors-repository";

export const makeCreateAuthor = (): CreateAuthor => {
  const authorRepository = new PrismaAuthorsRepository();
  const createAuthor = new CreateAuthor(authorRepository);

  return createAuthor;
};
