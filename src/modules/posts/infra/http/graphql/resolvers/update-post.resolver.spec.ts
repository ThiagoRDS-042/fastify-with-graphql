import request from "supertest";

import { app } from "@app";
import { makeCreatePost } from "./factories/make-create-post";
import {
  UPDATE_POST_MUTATION,
  UPDATE_POST_OPERATION_NAME,
  generateUpdatePostVariables,
} from "@docs/graphql/posts/update-post";
import { makeCreateAndAuthenticateAuthor } from "@modules/authors/infra/http/graphql/resolvers/factories/make-create-and-authenticate-author";

describe("Update post (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to update a post", async () => {
    const { accessToken, author } = await makeCreateAndAuthenticateAuthor(app);

    const { post } = await makeCreatePost(author.id);

    const content = "This is a content.";
    const title = "This is a title.";
    const description = "This is a description.";

    const response = await request(app.server)
      .post("/graphql")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        operationName: UPDATE_POST_OPERATION_NAME,
        query: UPDATE_POST_MUTATION,
        variables: generateUpdatePostVariables({
          postId: post.id,
          category: "nature",
          content,
          title,
          description,
        }),
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toHaveProperty("updatePost");
    expect(response.body.data.updatePost).toHaveProperty("post");
    expect(response.body.data.updatePost.post).toEqual(
      expect.objectContaining({
        id: post.id,
        isActive: post.isActive,
        content,
        description,
        publishedAt: post.publishedAt,
        authorId: post.authorId,
        title,
      })
    );
  });
});
