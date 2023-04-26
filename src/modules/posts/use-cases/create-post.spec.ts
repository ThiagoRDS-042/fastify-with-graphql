import { AppError } from "@shared/errors";
import { CreatePost } from "./create-post";
import { makeAuthor } from "@modules/authors/repositories/in-memory/factories/make-author";
import { InMemoryPostsRepository } from "../repositories/in-memory/in-memory-posts-repository";
import { InMemoryAuthorsRepository } from "@modules/authors/repositories/in-memory/in-memory-authors-repository";

let postsRepository: InMemoryPostsRepository;
let authorsRepository: InMemoryAuthorsRepository;
let sut: CreatePost;

describe("Create post use case", () => {
  beforeEach(() => {
    postsRepository = new InMemoryPostsRepository();
    authorsRepository = new InMemoryAuthorsRepository();
    sut = new CreatePost(postsRepository, authorsRepository);
  });

  it("should be able to create a new post", async () => {
    const author = makeAuthor();
    await authorsRepository.create(author);

    const { post } = await sut.execute({
      authorId: author.id,
      category: "games",
      content: "Random content",
      title: "This is a random title",
      description: null,
    });

    expect(post.id).toEqual(expect.any(String));
  });

  it("should not be able to create a new post with a existing tag", async () => {
    const author = makeAuthor();
    await authorsRepository.create(author);

    await sut.execute({
      authorId: author.id,
      category: "games",
      content: "Random content",
      title: "This is a random title",
      description: null,
    });

    await expect(() =>
      sut.execute({
        authorId: author.id,
        category: "games",
        content: "Random content",
        title: "This is a random title",
        description: null,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new post with a non existing author", async () => {
    await expect(() =>
      sut.execute({
        authorId: "non-existing-author",
        category: "games",
        content: "Random content",
        title: "This is a random title",
        description: null,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
