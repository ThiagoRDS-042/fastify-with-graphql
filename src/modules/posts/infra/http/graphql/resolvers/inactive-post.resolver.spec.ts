import request from "supertest";

import { app } from "@app";
import { makeCreatePost } from "./factories/make-create-post";
import {
  INACTIVE_POST_MUTATION,
  INACTIVE_POST_OPERATION_NAME,
  generateInactivePostVariables,
} from "@docs/graphql/posts/inactive-post";
import { makeCreateAndAuthenticateAuthor } from "@modules/authors/infra/http/graphql/resolvers/factories/make-create-and-authenticate-author";

describe("Inactive post (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to inactive a post", async () => {
    const { accessToken, author } = await makeCreateAndAuthenticateAuthor(app);

    const { post } = await makeCreatePost(author.id);

    const response = await request(app.server)
      .post("/graphql")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        operationName: INACTIVE_POST_OPERATION_NAME,
        query: INACTIVE_POST_MUTATION,
        variables: generateInactivePostVariables({
          postId: post.id,
        }),
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toHaveProperty("inactivePost");
    expect(response.body.data.inactivePost).toBeTruthy();
  });
});
