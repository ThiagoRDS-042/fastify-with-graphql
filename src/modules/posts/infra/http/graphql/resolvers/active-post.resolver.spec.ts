import request from "supertest";

import { app } from "@app";
import { makeCreatePost } from "./factories/make-create-post";
import { makeInactivePost } from "./factories/make-inactive-post";
import {
  ACTIVE_POST_MUTATION,
  ACTIVE_POST_OPERATION_NAME,
  generateActivePostVariables,
} from "@docs/graphql/posts/active-post";
import { makeCreateAndAuthenticateAuthor } from "@modules/authors/infra/http/graphql/resolvers/factories/make-create-and-authenticate-author";

describe("Active post (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to active a post", async () => {
    const { accessToken, author } = await makeCreateAndAuthenticateAuthor(app);

    const { post } = await makeCreatePost(author.id);

    await makeInactivePost(post.id);

    const response = await request(app.server)
      .post("/graphql")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        operationName: ACTIVE_POST_OPERATION_NAME,
        query: ACTIVE_POST_MUTATION,
        variables: generateActivePostVariables({
          postId: post.id,
        }),
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toHaveProperty("activePost");
    expect(response.body.data.activePost).toBeTruthy();
  });
});
