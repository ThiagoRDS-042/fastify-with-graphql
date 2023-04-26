import request from "supertest";

import { app } from "@app";
import { makeCreateAndAuthenticateAuthor } from "./factories/make-create-and-authenticate-author";
import {
  SHOW_AUTHOR_OPERATION_NAME,
  SHOW_AUTHOR_QUERY,
} from "@docs/graphql/authors/show-author";

describe("Show author (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to show a author", async () => {
    const { accessToken, author } = await makeCreateAndAuthenticateAuthor(app);

    const response = await request(app.server)
      .post("/graphql")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        operationName: SHOW_AUTHOR_OPERATION_NAME,
        query: SHOW_AUTHOR_QUERY,
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toHaveProperty("showAuthor");
    expect(response.body.data.showAuthor).toHaveProperty("author");
    expect(response.body.data.showAuthor.author).toEqual(
      expect.objectContaining({
        id: author.id,
        email: author.email,
        name: author.name,
        phone: author.phone,
      })
    );
  });
});
