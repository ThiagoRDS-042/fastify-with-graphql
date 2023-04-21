import { beforeEach, describe, expect, it } from "vitest";

import { AppError } from "@shared/errors";
import { ShowPost } from "./show-post";
import { makePost } from "../repositories/in-memory/factories/make-post";
import { InMemoryPostsRepository } from "../repositories/in-memory/in-memory-posts-repository";

let postsRepository: InMemoryPostsRepository;
let sut: ShowPost;

describe("Show post use case", () => {
  beforeEach(() => {
    postsRepository = new InMemoryPostsRepository();
    sut = new ShowPost(postsRepository);
  });

  it("should be able to show a post", async () => {
    const postTmp = makePost();
    await postsRepository.create(postTmp);

    const { post } = await sut.execute({
      postId: postTmp.id,
    });

    expect(post).toEqual(expect.any(Object));
    expect(post.id).toEqual(postTmp.id);
  });

  it("should not be able to show a non existing post", async () => {
    await expect(() =>
      sut.execute({
        postId: "non-existing-post",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
