import { ListAuthors } from "../list-authors";
import { PrismaAuthorsRepository } from "../../infra/prisma/repositories/prisma-authors-repository";

export const makeListAuthors = (): ListAuthors => {
  const authorRepository = new PrismaAuthorsRepository();
  const listAuthors = new ListAuthors(authorRepository);

  return listAuthors;
};
