import { AppError, errors, codes } from "@shared/errors";
import { AuthorsRepository } from "../repositories/authors-repository";

interface IParams {
  authorId: string;
}

export class DeleteAuthor {
  constructor(private readonly authorsRepository: AuthorsRepository) {}

  public async execute(params: IParams): Promise<void> {
    const { authorId } = params;

    const author = await this.authorsRepository.findById(authorId);

    if (author === null) {
      throw new AppError(
        "Author does not exist.",
        codes.RESOURCE_NOT_FOUND,
        errors.NOT_FOUND
      );
    }

    author.delete();

    await this.authorsRepository.save(author);
  }
}
