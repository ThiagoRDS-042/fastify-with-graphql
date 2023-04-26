import request from "supertest";

import { app } from "@app";
import {
  CREATE_POST_MUTATION,
  CREATE_POST_OPERATION_NAME,
  generateCreatePostVariables,
} from "@docs/graphql/posts/create-post";
import { makeCreateAndAuthenticateAuthor } from "@modules/authors/infra/http/graphql/resolvers/factories/make-create-and-authenticate-author";

describe("Create post (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a new post", async () => {
    const { accessToken, author } = await makeCreateAndAuthenticateAuthor(app);

    const content = "This is a test content.";
    const title = "This is a test title";
    const description = null;

    const response = await request(app.server)
      .post("/graphql")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        operationName: CREATE_POST_OPERATION_NAME,
        query: CREATE_POST_MUTATION,
        variables: generateCreatePostVariables({
          category: "games",
          content,
          title,
          description,
        }),
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toHaveProperty("createPost");
    expect(response.body.data.createPost).toHaveProperty("post");
    expect(response.body.data.createPost.post.id).toEqual(expect.any(String));
    expect(response.body.data.createPost.post).toEqual(
      expect.objectContaining({
        content,
        title,
        description,
        authorId: author.id,
        publishedAt: null,
        isActive: true,
      })
    );
  });
});
