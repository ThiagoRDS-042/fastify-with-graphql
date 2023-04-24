import DataLoader from "dataloader";

import { Author } from "@modules/authors/entities/author.entity";
import { AuthorsRepository } from "@modules/authors/repositories/authors-repository";
import { PrismaAuthorsRepository } from "@modules/authors/infra/prisma/repositories/prisma-authors-repository";

export class AuthorsDataLoader {
  private readonly authorsRepository: AuthorsRepository;

  constructor() {
    this.authorsRepository = new PrismaAuthorsRepository();
  }

  public async getById(authorId: string): Promise<Author> {
    return this.getByIdLoader.load(authorId);
  }

  private getByIdLoader = new DataLoader(
    async (authorIds: readonly string[]) => {
      const authors = await this.authorsRepository.findIn(
        authorIds.map((authorId) => authorId)
      );

      return authorIds.map((authorId) =>
        authors.find((author) => author.id === authorId)
      );
    }
  );
}
