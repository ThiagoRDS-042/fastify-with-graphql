import { beforeEach, describe, expect, it } from "vitest";

import { AppError } from "@shared/errors";
import { ShowAuthor } from "./show-author";
import { makeAuthor } from "../repositories/in-memory/factories/make-author";
import { InMemoryAuthorsRepository } from "../repositories/in-memory/in-memory-authors-repository";

let authorsRepository: InMemoryAuthorsRepository;
let sut: ShowAuthor;

describe("Show author use case", () => {
  beforeEach(() => {
    authorsRepository = new InMemoryAuthorsRepository();
    sut = new ShowAuthor(authorsRepository);
  });

  it("Should be able show a author", async () => {
    const authorTmp = makeAuthor();

    await authorsRepository.create(authorTmp);

    const { author } = await sut.execute({
      authorId: authorTmp.id,
    });

    expect(author).toEqual(expect.any(Object));
    expect(author.id).toEqual(authorTmp.id);
  });

  it("should not be able to show a non existing author", async () => {
    await expect(() =>
      sut.execute({
        authorId: "invalid-author-id",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
