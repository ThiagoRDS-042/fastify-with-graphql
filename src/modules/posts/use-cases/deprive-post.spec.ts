import { AppError } from "@shared/errors";
import { DeprivePost } from "./deprive-post";
import { makePost } from "../repositories/in-memory/factories/make-post";
import { InMemoryPostsRepository } from "../repositories/in-memory/in-memory-posts-repository";

let postsRepository: InMemoryPostsRepository;
let sut: DeprivePost;

describe("Deprive post use case", () => {
  beforeEach(() => {
    postsRepository = new InMemoryPostsRepository();
    sut = new DeprivePost(postsRepository);
  });

  it("should be able to deprive a post", async () => {
    const post = makePost();
    await postsRepository.create(post);

    post.publish();
    await postsRepository.save(post);

    await sut.execute({
      postId: post.id,
    });

    expect(postsRepository.posts[0].publishedAt).toEqual(null);
  });

  it("should not be able to deprive a non existing post", async () => {
    await expect(() =>
      sut.execute({
        postId: "non-existing-post",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to reprive a post", async () => {
    const post = makePost();
    await postsRepository.create(post);

    post.publish();
    await postsRepository.save(post);

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
