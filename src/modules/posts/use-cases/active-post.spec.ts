import { beforeEach, describe, expect, it } from "vitest";

import { AppError } from "@shared/errors";
import { ActivePost } from "./active-post";
import { makePost } from "../repositories/in-memory/factories/make-post";
import { InMemoryPostsRepository } from "../repositories/in-memory/in-memory-posts-repository";

let postsRepository: InMemoryPostsRepository;
let sut: ActivePost;

describe("Active post use case", () => {
  beforeEach(() => {
    postsRepository = new InMemoryPostsRepository();
    sut = new ActivePost(postsRepository);
  });

  it("should be able to active a post", async () => {
    const post = makePost();
    await postsRepository.create(post);

    post.inactive();
    await postsRepository.save(post);

    await sut.execute({
      postId: post.id,
    });

    expect(postsRepository.posts[0].isActive).toBeTruthy();
  });

  it("should not be able to active a non existing post", async () => {
    await expect(() =>
      sut.execute({
        postId: "non-existing-post",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to active a post", async () => {
    const post = makePost();
    await postsRepository.create(post);

    await expect(() =>
      sut.execute({
        postId: post.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
