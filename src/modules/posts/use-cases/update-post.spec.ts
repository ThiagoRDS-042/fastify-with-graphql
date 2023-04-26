import { AppError } from "@shared/errors";
import { UpdatePost } from "./update-post";
import { makePost } from "../repositories/in-memory/factories/make-post";
import { InMemoryPostsRepository } from "../repositories/in-memory/in-memory-posts-repository";

let postsRepository: InMemoryPostsRepository;
let sut: UpdatePost;

describe("Update post use case", () => {
  beforeEach(() => {
    postsRepository = new InMemoryPostsRepository();
    sut = new UpdatePost(postsRepository);
  });

  it("should be able to update a post", async () => {
    const postTmp = makePost();
    await postsRepository.create(postTmp);

    const description = "This is a random description";
    const title = "This is a random title";
    const content = "Random content";

    const { post } = await sut.execute({
      postId: postTmp.id,
      category: "nature",
      content,
      title,
      description,
    });

    expect(post.title).toEqual(title);
    expect(post.content).toEqual(content);
    expect(post.description).toEqual(description);
  });

  it("should not be able to update a post a existing tag", async () => {
    const post = makePost();
    await postsRepository.create(post);

    const title = "This is a random title";

    await sut.execute({
      postId: post.id,
      category: "nature",
      content: "This is a random description",
      title,
      description: "Random content",
    });

    const postWithSameTag = makePost();
    await postsRepository.create(postWithSameTag);

    await expect(() =>
      sut.execute({
        postId: postWithSameTag.id,
        category: "nature",
        content: "This is a random description",
        title,
        description: "Random content",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update a non existing post", async () => {
    await expect(() =>
      sut.execute({
        postId: "non-existing-post",
        category: "nature",
        content: "Random content",
        title: "This is a random title",
        description: "This is a random description",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
