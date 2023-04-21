import { UpdateAuthor } from "../update-author";
import { PrismaAuthorsRepository } from "../../infra/prisma/repositories/prisma-authors-repository";

export const makeUpdateAuthor = (): UpdateAuthor => {
  const authorRepository = new PrismaAuthorsRepository();
  const updateAuthor = new UpdateAuthor(authorRepository);

  return updateAuthor;
};
