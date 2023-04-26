import request from "supertest";

import { app } from "@app";
import { makeCreatePost } from "./factories/make-create-post";
import { makePublishPost } from "./factories/make-publish-post";
import {
  DEPRIVE_POST_MUTATION,
  DEPRIVE_POST_OPERATION_NAME,
  generateDeprivePostVariables,
} from "@docs/graphql/posts/deprive-post";
import { makeCreateAndAuthenticateAuthor } from "@modules/authors/infra/http/graphql/resolvers/factories/make-create-and-authenticate-author";

describe("Deprive post (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to deprive a post", async () => {
    const { accessToken, author } = await makeCreateAndAuthenticateAuthor(app);

    const { post } = await makeCreatePost(author.id);

    await makePublishPost(post.id);

    const response = await request(app.server)
      .post("/graphql")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        operationName: DEPRIVE_POST_OPERATION_NAME,
        query: DEPRIVE_POST_MUTATION,
        variables: generateDeprivePostVariables({
          postId: post.id,
        }),
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toHaveProperty("deprivePost");
    expect(response.body.data.deprivePost).toBeTruthy();
  });
});
