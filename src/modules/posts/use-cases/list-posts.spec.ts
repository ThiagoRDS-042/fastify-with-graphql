import { beforeEach, describe, expect, it } from "vitest";

import { ListPosts } from "./list-posts";
import { makePost } from "../repositories/in-memory/factories/make-post";
import { InMemoryPostsRepository } from "../repositories/in-memory/in-memory-posts-repository";

let postsRepository: InMemoryPostsRepository;
let sut: ListPosts;

describe("List posts use case", () => {
  beforeEach(() => {
    postsRepository = new InMemoryPostsRepository();
    sut = new ListPosts(postsRepository);
  });

  it("should be able to list a posts", async () => {
    const postTmp = makePost();

    await postsRepository.create(postTmp);
    await postsRepository.create(makePost());

    const { authorId, category, title, tag, publishedAt } = postTmp;

    const { posts } = await sut.execute({
      authorIdEquals: authorId,
      categoryEquals: category,
      tagEquals: tag,
      titleContains: title,
      publish: !!publishedAt,
    });

    expect(posts).toHaveLength(2);
    expect(posts).toEqual([
      expect.objectContaining({ authorId, category, title, tag, publishedAt }),
      expect.objectContaining({ authorId, category, title, tag, publishedAt }),
    ]);
  });
});
