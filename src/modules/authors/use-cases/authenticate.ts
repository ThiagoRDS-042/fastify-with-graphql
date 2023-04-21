import { compare } from "bcryptjs";

import { Author } from "../entities/author.entity";
import { AppError, errors, codes } from "@shared/errors";
import { AuthorsRepository } from "../repositories/authors-repository";

interface IParams {
  email: string;
  password: string;
}

interface IResponse {
  author: Author;
}

export class Authenticate {
  constructor(private readonly authorsRepository: AuthorsRepository) {}

  public async execute(params: IParams): Promise<IResponse> {
    const { email, password } = params;

    const author = await this.authorsRepository.findByEmail(email);

    if (author === null) {
      throw new AppError(
        "Invalid credentials",
        codes.INVALID_CREDENTIALS,
        errors.UNAUTHORIZED
      );
    }

    const doesPasswordMatches = await compare(password, author.password);

    if (!doesPasswordMatches) {
      throw new AppError(
        "Invalid credentials",
        codes.INVALID_CREDENTIALS,
        errors.UNAUTHORIZED
      );
    }

    return { author };
  }
}
