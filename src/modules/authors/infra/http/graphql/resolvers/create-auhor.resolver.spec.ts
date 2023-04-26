import request from "supertest";

import { app } from "@app";
import {
  CREATE_AUTHOR_MUTATION,
  CREATE_AUTHOR_OPERATION_NAME,
  generateCreateAuthorVariables,
} from "@docs/graphql/authors/create-author";

describe("Create author (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a new author", async () => {
    const email = "author.test-e2e@example.com.br";
    const name = "Author Test e2e";
    const phone = "12345678";

    const response = await request(app.server)
      .post("/graphql")
      .send({
        operationName: CREATE_AUTHOR_OPERATION_NAME,
        query: CREATE_AUTHOR_MUTATION,
        variables: generateCreateAuthorVariables({
          email,
          name,
          password: "Test-E2E",
          phone,
        }),
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toHaveProperty("createAuthor");
    expect(response.body.data.createAuthor).toHaveProperty("author");
    expect(response.body.data.createAuthor.author.id).toEqual(
      expect.any(String)
    );
    expect(response.body.data.createAuthor.author).toEqual(
      expect.objectContaining({
        email,
        name,
        phone,
      })
    );
  });
});
