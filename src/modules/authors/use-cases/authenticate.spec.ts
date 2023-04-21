import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";

import { Authenticate } from "./authenticate";
import { makeAuthor } from "../repositories/in-memory/factories/make-author";
import { InMemoryAuthorsRepository } from "../repositories/in-memory/in-memory-authors-repository";
import { AppError } from "@shared/errors";

let authorsRepository: InMemoryAuthorsRepository;
let sut: Authenticate;

describe("Authenticate use case", () => {
  beforeEach(() => {
    authorsRepository = new InMemoryAuthorsRepository();
    sut = new Authenticate(authorsRepository);
  });

  it("Should be able to authenticate", async () => {
    const email = "example@mail.com.br";
    const password = "password";

    await authorsRepository.create(
      makeAuthor({ email, password: await hash(password, 6) })
    );

    const { author } = await sut.execute({ email, password });

    expect(author).toEqual(expect.any(Object));
    expect(author.email).toEqual(email);
  });

  it("should not be able to authenticate with wrong email", async () => {
    const email = "example@mail.com.br";
    const password = "password";

    await authorsRepository.create(
      makeAuthor({ email, password: await hash(password, 6) })
    );

    await expect(() =>
      sut.execute({ email: "invalid-email", password })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    const email = "example@mail.com.br";
    const password = "password";

    await authorsRepository.create(makeAuthor({ email, password }));

    await expect(() => sut.execute({ email, password })).rejects.toBeInstanceOf(
      AppError
    );
  });
});
