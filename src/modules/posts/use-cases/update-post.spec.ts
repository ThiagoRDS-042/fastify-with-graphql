import { beforeEach, describe, expect, it } from "vitest";

import { AppError } from "@shared/errors";
import { UpdatePost } from "./update-post";
import { makePost } from "../repositories/in-memory/factories/make-post";
import { makeAuthor } from "@modules/authors/repositories/in-memory/factories/make-author";
import { InMemoryPostsRepository } from "../repositories/in-memory/in-memory-posts-repository";
import { InMemoryAuthorsRepository } from "@modules/authors/repositories/in-memory/in-memory-authors-repository";

let postsRepository: InMemoryPostsRepository;
let authorsRepository: InMemoryAuthorsRepository;
let sut: UpdatePost;

describe("Update post use case", () => {
  beforeEach(() => {
    postsRepository = new InMemoryPostsRepository();
    authorsRepository = new InMemoryAuthorsRepository();
    sut = new UpdatePost(postsRepository, authorsRepository);
  });

  it("should be able to update a post", async () => {
    const author = makeAuthor();
    await authorsRepository.create(author);

    const postTmp = makePost({ authorId: author.id });
    await postsRepository.create(postTmp);

    const description = "This is a random description";
    const title = "This is a random title";
    const content = "Random content";

    const { post } = await sut.execute({
      postId: postTmp.id,
      authorId: author.id,
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
    const author = makeAuthor();
    await authorsRepository.create(author);

    const post = makePost({ authorId: author.id });
    await postsRepository.create(post);

    const title = "This is a random title";

    await sut.execute({
      postId: post.id,
      authorId: author.id,
      category: "nature",
      content: "This is a random description",
      title,
      description: "Random content",
    });

    const postWithSameTag = makePost({ authorId: author.id });
    await postsRepository.create(postWithSameTag);

    await expect(() =>
      sut.execute({
        postId: postWithSameTag.id,
        authorId: author.id,
        category: "nature",
        content: "This is a random description",
        title,
        description: "Random content",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update a post with a non existing author", async () => {
    const post = makePost();
    await postsRepository.create(post);

    await expect(() =>
      sut.execute({
        postId: post.id,
        authorId: "non-existing-author",
        category: "nature",
        content: "Random content",
        title: "This is a random title",
        description: "This is a random description",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update a non existing post", async () => {
    const author = makeAuthor();
    await authorsRepository.create(author);

    await expect(() =>
      sut.execute({
        postId: "non-existing-post",
        authorId: author.id,
        category: "nature",
        content: "Random content",
        title: "This is a random title",
        description: "This is a random description",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update a post with author is not the owner", async () => {
    const author = makeAuthor();
    await authorsRepository.create(author);

    const post = makePost({ authorId: author.id });
    await postsRepository.create(post);

    const authorIsNotTheOwner = makeAuthor();
    await authorsRepository.create(authorIsNotTheOwner);

    await expect(() =>
      sut.execute({
        postId: post.id,
        authorId: authorIsNotTheOwner.id,
        category: "nature",
        content: "Random content",
        title: "This is a random title",
        description: "This is a random description",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
