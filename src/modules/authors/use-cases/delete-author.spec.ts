import { beforeEach, describe, expect, it } from "vitest";

import { AppError } from "@shared/errors";
import { DeleteAuthor } from "./delete-author";
import { makeAuthor } from "../repositories/in-memory/factories/make-author";
import { InMemoryAuthorsRepository } from "../repositories/in-memory/in-memory-authors-repository";

let authorsRepository: InMemoryAuthorsRepository;
let sut: DeleteAuthor;

describe("Delete author use case", () => {
  beforeEach(() => {
    authorsRepository = new InMemoryAuthorsRepository();
    sut = new DeleteAuthor(authorsRepository);
  });

  it("Should be able delete a author", async () => {
    const authorTmp = makeAuthor();

    await authorsRepository.create(authorTmp);

    await sut.execute({
      authorId: authorTmp.id,
    });

    expect(authorsRepository.authors[0].deletedAt).toEqual(expect.any(Date));
  });

  it("should not be able to delete a non existing author", async () => {
    await expect(() =>
      sut.execute({
        authorId: "invalid-author-id",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
