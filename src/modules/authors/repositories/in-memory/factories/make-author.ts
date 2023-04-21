import { Author, AuthorProps } from "@modules/authors/entities/author.entity";

type Override = Partial<AuthorProps>;

export const makeAuthor = (override: Override = {}): Author => {
  return Author.newAuthor({
    name: "John",
    email: "example@mail.com.br",
    password: "password",
    phone: "12345678",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    ...override,
  });
};
