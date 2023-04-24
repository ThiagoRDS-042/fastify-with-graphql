import { beforeEach, describe, expect, it } from "vitest";

import { InactivePostsByAuthorId } from "./inative-posts-by-author-id";
import { makePost } from "../repositories/in-memory/factories/make-post";
import { makeAuthor } from "@modules/authors/repositories/in-memory/factories/make-author";
import { InMemoryPostsRepository } from "../repositories/in-memory/in-memory-posts-repository";
import { InMemoryAuthorsRepository } from "@modules/authors/repositories/in-memory/in-memory-authors-repository";

let authorsRepository: InMemoryAuthorsRepository;
let postsRepository: InMemoryPostsRepository;
let sut: InactivePostsByAuthorId;

describe("Inactive posts by author id use case", () => {
  beforeEach(() => {
    authorsRepository = new InMemoryAuthorsRepository();
    postsRepository = new InMemoryPostsRepository();
    sut = new InactivePostsByAuthorId(postsRepository);
  });

  it("should be able to inactive a posts of the author", async () => {
    const author = makeAuthor();
    await authorsRepository.create(author);

    await postsRepository.create(makePost({ authorId: author.id }));

    await postsRepository.create(makePost({ authorId: author.id }));

    await sut.execute({
      authorId: author.id,
    });

    expect(postsRepository.posts).toEqual([
      expect.objectContaining({
        isActive: false,
      }),
      expect.objectContaining({
        isActive: false,
      }),
    ]);
  });
});
