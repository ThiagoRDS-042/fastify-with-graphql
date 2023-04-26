import { AppError } from "@shared/errors";
import { InactivePost } from "./inactive-post";
import { makePost } from "../repositories/in-memory/factories/make-post";
import { InMemoryPostsRepository } from "../repositories/in-memory/in-memory-posts-repository";

let postsRepository: InMemoryPostsRepository;
let sut: InactivePost;

describe("Inactive post use case", () => {
  beforeEach(() => {
    postsRepository = new InMemoryPostsRepository();
    sut = new InactivePost(postsRepository);
  });

  it("should be able to inactive a post", async () => {
    const post = makePost();
    await postsRepository.create(post);

    await sut.execute({
      postId: post.id,
    });

    expect(postsRepository.posts[0].isActive).toBeFalsy();
  });

  it("should not be able to inactive a non existing post", async () => {
    await expect(() =>
      sut.execute({
        postId: "non-existing-post",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to inactive a post", async () => {
    const post = makePost();
    await postsRepository.create(post);

    await sut.execute({
      postId: post.id,
    });

    await expect(() =>
      sut.execute({
        postId: post.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
