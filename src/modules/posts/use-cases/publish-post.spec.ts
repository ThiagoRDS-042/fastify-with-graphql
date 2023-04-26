import { AppError } from "@shared/errors";
import { PublishPost } from "./publish-post";
import { makePost } from "../repositories/in-memory/factories/make-post";
import { InMemoryPostsRepository } from "../repositories/in-memory/in-memory-posts-repository";

let postsRepository: InMemoryPostsRepository;
let sut: PublishPost;

describe("Publish post use case", () => {
  beforeEach(() => {
    postsRepository = new InMemoryPostsRepository();
    sut = new PublishPost(postsRepository);
  });

  it("should be able to publish a post", async () => {
    const post = makePost();
    await postsRepository.create(post);

    await sut.execute({
      postId: post.id,
    });

    expect(postsRepository.posts[0].publishedAt).toEqual(expect.any(Date));
  });

  it("should not be able to publish a non existing post", async () => {
    await expect(() =>
      sut.execute({
        postId: "non-existing-post",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to republish a post", async () => {
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
