import { DeleteAuthor } from "../delete-author";
import { PrismaAuthorsRepository } from "../../infra/prisma/repositories/prisma-authors-repository";

export const makeDeleteAuthor = (): DeleteAuthor => {
  const authorRepository = new PrismaAuthorsRepository();
  const deleteAuthor = new DeleteAuthor(authorRepository);

  return deleteAuthor;
};
