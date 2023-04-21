import { hash } from "bcryptjs";

import { Author } from "../entities/author.entity";
import { AppError, errors, codes } from "@shared/errors";
import { AuthorsRepository } from "../repositories/authors-repository";

interface IParams {
  authorId: string;
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface IResponse {
  author: Author;
}

export class UpdateAuthor {
  constructor(private authorsRepository: AuthorsRepository) {}

  public async execute(params: IParams): Promise<IResponse> {
    const { authorId, email, name, password, phone } = params;

    const authorExists = await this.authorsRepository.findById(authorId);

    if (authorExists === null) {
      throw new AppError(
        "Author does not exist.",
        codes.RESOURCE_NOT_FOUND,
        errors.NOT_FOUND
      );
    }

    const emailExists = await this.authorsRepository.findByEmail(email);

    if (emailExists && emailExists.id !== authorExists.id) {
      throw new AppError(
        "Email already exist.",
        codes.RESOURCE_ALREADY_USED,
        errors.CONFLICT
      );
    }

    const passwordEncrypted = await hash(password, 10);

    const author = Author.newAuthor(
      {
        email,
        name,
        password: passwordEncrypted,
        phone,
      },
      authorId
    );

    await this.authorsRepository.save(author);

    return { author };
  }
}
