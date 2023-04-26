import request from "supertest";

import { app } from "@app";
import { makeCreateAndAuthenticateAuthor } from "./factories/make-create-and-authenticate-author";
import {
  UPDATE_AUTHOR_MUTATION,
  UPDATE_AUTHOR_OPERATION_NAME,
  generateUpdateAuthorVariables,
} from "@docs/graphql/authors/update-author";

describe("Update author (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to update a author", async () => {
    const { accessToken, author } = await makeCreateAndAuthenticateAuthor(app);

    const email = "author.test-e2e@example.com.br";
    const name = "Author Test e2e";
    const phone = "12345678";

    const response = await request(app.server)
      .post("/graphql")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        operationName: UPDATE_AUTHOR_OPERATION_NAME,
        query: UPDATE_AUTHOR_MUTATION,
        variables: generateUpdateAuthorVariables({
          email,
          name,
          phone,
          password: "New-password",
        }),
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toHaveProperty("updateAuthor");
    expect(response.body.data.updateAuthor).toHaveProperty("author");
    expect(response.body.data.updateAuthor.author).toEqual(
      expect.objectContaining({
        id: author.id,
        email,
        name,
        phone,
      })
    );
  });
});
