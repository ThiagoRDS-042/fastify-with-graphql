import { ListAuthors } from "./list-authors";
import { makeAuthor } from "../repositories/in-memory/factories/make-author";
import { InMemoryAuthorsRepository } from "../repositories/in-memory/in-memory-authors-repository";

let authorsRepository: InMemoryAuthorsRepository;
let sut: ListAuthors;

describe("List authors use case", () => {
  beforeEach(() => {
    authorsRepository = new InMemoryAuthorsRepository();
    sut = new ListAuthors(authorsRepository);
  });

  it("Should be able list a authors", async () => {
    const email = "example@example.com";
    const name = "john";

    await authorsRepository.create(makeAuthor({ email, name }));
    await authorsRepository.create(makeAuthor({ email, name }));

    const { authors } = await sut.execute({
      emailContains: email,
      nameContains: name,
    });

    expect(authors).toHaveLength(2);
    expect(authors).toEqual([
      expect.objectContaining({
        email,
        name,
      }),
      expect.objectContaining({
        email,
        name,
      }),
    ]);
  });
});
