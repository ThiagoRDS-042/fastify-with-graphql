import { Author } from "../entities/author.entity";
import { AppError, errors, codes } from "@shared/errors";
import { AuthorsRepository } from "../repositories/authors-repository";

interface IParams {
  authorId: string;
}

interface IResponse {
  author: Author;
}

export class ShowAuthor {
  constructor(private readonly authorsRepository: AuthorsRepository) {}

  public async execute(params: IParams): Promise<IResponse> {
    const { authorId } = params;

    const author = await this.authorsRepository.findById(authorId);

    if (author === null) {
      throw new AppError(
        "Author does not exist.",
        codes.RESOURCE_NOT_FOUND,
        errors.NOT_FOUND
      );
    }

    return { author };
  }
}
