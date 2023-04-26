import request from "supertest";

import { app } from "@app";
import { makeCreateAndAuthenticateAuthor } from "./factories/make-create-and-authenticate-author";
import {
  LIST_AUTHORS_QUERY,
  LIST_AUTHOR_OPERATION_NAME,
  generateListAuthorsVariables,
} from "@docs/graphql/authors/list-authors";

describe("List authors (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list a authors", async () => {
    const { accessToken, author } = await makeCreateAndAuthenticateAuthor(app);

    const response = await request(app.server)
      .post("/graphql")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        operationName: LIST_AUTHOR_OPERATION_NAME,
        query: LIST_AUTHORS_QUERY,
        variables: generateListAuthorsVariables({
          emailContains: author.email.slice(0, 6),
          nameContains: author.name.slice(0, 6),
        }),
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toHaveProperty("listAuthors");
    expect(response.body.data.listAuthors).toHaveProperty("authors");
    expect(response.body.data.listAuthors.authors).toEqual([
      expect.objectContaining({
        id: author.id,
        email: author.email,
        name: author.name,
        phone: author.phone,
      }),
    ]);
  });
});
