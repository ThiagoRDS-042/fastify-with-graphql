import request from "supertest";

import { app } from "@app";
import { makeCreatePost } from "./factories/make-create-post";
import {
  SHOW_POST_OPERATION_NAME,
  SHOW_POST_QUERY,
  generateShowPostVariables,
} from "@docs/graphql/posts/show-post";
import { makeCreateAndAuthenticateAuthor } from "@modules/authors/infra/http/graphql/resolvers/factories/make-create-and-authenticate-author";

describe("Show post (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to show a post", async () => {
    const { accessToken, author } = await makeCreateAndAuthenticateAuthor(app);

    const { post } = await makeCreatePost(author.id);

    const response = await request(app.server)
      .post("/graphql")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        operationName: SHOW_POST_OPERATION_NAME,
        query: SHOW_POST_QUERY,
        variables: generateShowPostVariables({
          postId: post.id,
        }),
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toHaveProperty("showPost");
    expect(response.body.data.showPost).toHaveProperty("post");
    expect(response.body.data.showPost.post).toEqual(
      expect.objectContaining({
        id: post.id,
        isActive: post.isActive,
        content: post.content,
        description: post.description,
        publishedAt: post.publishedAt,
        authorId: post.authorId,
        title: post.title,
        tag: post.tag,
      })
    );
  });
});
