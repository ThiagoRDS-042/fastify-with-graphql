import { AuthorsRepository, IOpions } from "../authors-repository";
import { Author } from "@modules/authors/entities/author.entity";

export class InMemoryAuthorsRepository implements AuthorsRepository {
  public authors: Author[] = [];

  public async create(author: Author): Promise<void> {
    this.authors.push(author);
  }

  public async save(author: Author): Promise<void> {
    const authorIndex = this.authors.findIndex((item) => item.id === author.id);

    if (authorIndex >= 0) {
      this.authors[authorIndex] = author;
    }
  }

  public async findByEmail(email: string): Promise<Author | null> {
    const author = this.authors.find((item) => item.email === email);

    if (!author) {
      return null;
    }

    return author;
  }

  public async findById(authorId: string): Promise<Author | null> {
    const author = this.authors.find(
      (item) => item.id === authorId && !item.deletedAt
    );

    if (!author) {
      return null;
    }

    return author;
  }

  public async findMany(options?: IOpions): Promise<Author[]> {
    const { emailContains, nameContains } = options;

    let authors = this.authors.filter((item) => !item.deletedAt);

    if (emailContains) {
      authors = authors.filter((item) =>
        item.email
          .toLocaleUpperCase()
          .includes(emailContains.toLocaleUpperCase())
      );
    }

    if (nameContains) {
      authors = authors.filter((item) =>
        item.name.toLocaleUpperCase().includes(nameContains.toLocaleUpperCase())
      );
    }

    return authors;
  }

  public async findIn(authorIds: string[]): Promise<Author[]> {
    const authors = this.authors.filter((item) => authorIds.includes(item.id));

    return authors;
  }
}
