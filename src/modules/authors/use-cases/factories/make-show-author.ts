import { ShowAuthor } from "../show-author";
import { PrismaAuthorsRepository } from "../../infra/prisma/repositories/prisma-authors-repository";

export const makeShowAuthor = (): ShowAuthor => {
  const authorRepository = new PrismaAuthorsRepository();
  const showAuthor = new ShowAuthor(authorRepository);

  return showAuthor;
};
