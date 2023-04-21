import { hash } from "bcryptjs";

import { AppError, errors, codes } from "@shared/errors";
import { Author } from "../entities/author.entity";
import { AuthorsRepository } from "../repositories/authors-repository";

interface IParams {
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface IResponse {
  author: Author;
}

export class CreateAuthor {
  constructor(private authorsRepository: AuthorsRepository) {}

  public async execute(params: IParams): Promise<IResponse> {
    const { email, name, password, phone } = params;

    const authorALreadyExists = await this.authorsRepository.findByEmail(email);

    if (authorALreadyExists) {
      throw new AppError(
        "Email already used",
        codes.RESOURCE_ALREADY_USED,
        errors.CONFLICT
      );
    }

    const passwordEncrypted = await hash(password, 10);

    const author = Author.newAuthor({
      email,
      name,
      password: passwordEncrypted,
      phone,
    });

    await this.authorsRepository.create(author);

    return { author };
  }
}
