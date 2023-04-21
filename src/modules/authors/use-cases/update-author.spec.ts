import { beforeEach, describe, expect, it } from "vitest";

import { AppError } from "@shared/errors";
import { UpdateAuthor } from "./update-author";
import { makeAuthor } from "../repositories/in-memory/factories/make-author";
import { InMemoryAuthorsRepository } from "../repositories/in-memory/in-memory-authors-repository";

let authorsRepository: InMemoryAuthorsRepository;
let sut: UpdateAuthor;

describe("Update author use case", () => {
  beforeEach(() => {
    authorsRepository = new InMemoryAuthorsRepository();
    sut = new UpdateAuthor(authorsRepository);
  });

  it("Should be able update a author", async () => {
    const authorTmp = makeAuthor();
    await authorsRepository.create(authorTmp);

    const email = "example@mail.com.br";
    const name = "John";

    const { author } = await sut.execute({
      authorId: authorTmp.id,
      name,
      email,
      password: "password",
      phone: "2345345",
    });

    expect(author.email).toEqual(email);
    expect(author.name).toEqual(name);
  });

  it("should not be able to update a non existing author", async () => {
    await expect(() =>
      sut.execute({
        authorId: "invalid-author-id",
        email: "johndoe@example.com.br",
        name: "John",
        password: "password",
        phone: "2345345",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update a existing email", async () => {
    const email = "example2@mail.com.br";

    await authorsRepository.create(makeAuthor({ email }));

    const authorTmp = makeAuthor();
    await authorsRepository.create(authorTmp);

    await expect(() =>
      sut.execute({
        authorId: authorTmp.id,
        email,
        name: "John",
        password: "password",
        phone: "2345345",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
