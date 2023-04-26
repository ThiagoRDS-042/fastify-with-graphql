import request from "supertest";

import { app } from "@app";
import { makeCreatePost } from "./factories/make-create-post";
import {
  PUBLISH_POST_MUTATION,
  PUBLISH_POST_OPERATION_NAME,
  generatePublishPostVariables,
} from "@docs/graphql/posts/publish-post";
import { makeCreateAndAuthenticateAuthor } from "@modules/authors/infra/http/graphql/resolvers/factories/make-create-and-authenticate-author";

describe("Publish post (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to publish a post", async () => {
    const { accessToken, author } = await makeCreateAndAuthenticateAuthor(app);

    const { post } = await makeCreatePost(author.id);

    const response = await request(app.server)
      .post("/graphql")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        operationName: PUBLISH_POST_OPERATION_NAME,
        query: PUBLISH_POST_MUTATION,
        variables: generatePublishPostVariables({
          postId: post.id,
        }),
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toHaveProperty("publishPost");
    expect(response.body.data.publishPost).toBeTruthy();
  });
});
