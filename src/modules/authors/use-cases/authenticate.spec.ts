import { hash } from "bcryptjs";
import { subDays } from "date-fns";

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

  it("Should be able to authenticate and active a author account", async () => {
    const email = "example@mail.com.br";
    const password = "password";

    await authorsRepository.create(
      makeAuthor({
        email,
        password: await hash(password, 6),
        deletedAt: new Date(),
      })
    );

    const { author } = await sut.execute({ email, password });

    expect(author).toEqual(expect.any(Object));
    expect(author.email).toEqual(email);
  });

  it("Should not be able to authenticate and active a author account", async () => {
    const email = "example@mail.com.br";
    const password = "password";

    await authorsRepository.create(
      makeAuthor({
        email,
        password: await hash(password, 6),
        deletedAt: subDays(new Date(), 31),
      })
    );

    await expect(() => sut.execute({ email, password })).rejects.toBeInstanceOf(
      AppError
    );
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
