import { Author } from "../entities/author.entity";

export interface IOpions {
  nameContains?: string;
  emailContains?: string;
}

export interface AuthorsRepository {
  create(author: Author): Promise<void>;
  save(author: Author): Promise<void>;
  findByEmail(email: string): Promise<Author | null>;
  findById(authorId: string): Promise<Author | null>;
  findMany(options?: IOpions): Promise<Author[]>;
}
