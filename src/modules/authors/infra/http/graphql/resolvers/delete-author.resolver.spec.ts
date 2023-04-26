import request from "supertest";

import { app } from "@app";
import { makeCreateAndAuthenticateAuthor } from "./factories/make-create-and-authenticate-author";
import {
  DELETE_AUTHOR_MUTATION,
  DELETE_AUTHOR_OPERATION_NAME,
} from "@docs/graphql/authors/delete-author";

describe("Delete author (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to delete a author", async () => {
    const { accessToken } = await makeCreateAndAuthenticateAuthor(app);

    const response = await request(app.server)
      .post("/graphql")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        operationName: DELETE_AUTHOR_OPERATION_NAME,
        query: DELETE_AUTHOR_MUTATION,
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toHaveProperty("deleteAuthor");
    expect(response.body.data.deleteAuthor).toBeTruthy();
  });
});
