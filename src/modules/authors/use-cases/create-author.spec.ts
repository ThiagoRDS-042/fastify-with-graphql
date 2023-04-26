import { AppError } from "@shared/errors";
import { CreateAuthor } from "./create-author";
import { InMemoryAuthorsRepository } from "../repositories/in-memory/in-memory-authors-repository";

let authorsRepository: InMemoryAuthorsRepository;
let sut: CreateAuthor;

describe("Create author use case", () => {
  beforeEach(() => {
    authorsRepository = new InMemoryAuthorsRepository();
    sut = new CreateAuthor(authorsRepository);
  });

  it("Should be able create a author", async () => {
    const { author } = await sut.execute({
      name: "John",
      email: "example@mail.com.br",
      password: "password",
      phone: "2345345",
    });

    expect(author.id).toEqual(expect.any(String));
  });

  it("should not be able to register with same email twice", async () => {
    const email = "johndoe@example.com.br";

    await sut.execute({
      email,
      name: "John",
      password: "password",
      phone: "2345345",
    });

    await expect(() =>
      sut.execute({
        email,
        name: "John",
        password: "password",
        phone: "2345345",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
