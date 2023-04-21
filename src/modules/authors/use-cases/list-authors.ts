import { Author } from "../entities/author.entity";
import { AuthorsRepository } from "../repositories/authors-repository";

interface IParams {
  nameContains?: string;
  emailContains?: string;
}

interface IResponse {
  authors: Author[];
}

export class ListAuthors {
  constructor(private authorsRepository: AuthorsRepository) {}

  public async execute(parmas: IParams): Promise<IResponse> {
    const { emailContains, nameContains } = parmas;

    const authors = await this.authorsRepository.findMany({
      emailContains,
      nameContains,
    });

    return { authors };
  }
}
