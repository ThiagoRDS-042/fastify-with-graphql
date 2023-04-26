import request from "supertest";

import { app } from "@app";
import { makeCreatePost } from "./factories/make-create-post";
import { makePublishPost } from "./factories/make-publish-post";
import {
  LIST_POSTS_OPERATION_NAME,
  LIST_POSTS_QUERY,
  generateListPostsVariables,
} from "@docs/graphql/posts/list-posts";
import { makeCreateAndAuthenticateAuthor } from "@modules/authors/infra/http/graphql/resolvers/factories/make-create-and-authenticate-author";

describe("List posts (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list a posts", async () => {
    const { accessToken, author } = await makeCreateAndAuthenticateAuthor(app);

    const { post } = await makeCreatePost(author.id);

    await makePublishPost(post.id);

    const response = await request(app.server)
      .post("/graphql")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        operationName: LIST_POSTS_OPERATION_NAME,
        query: LIST_POSTS_QUERY,
        variables: generateListPostsVariables({
          authorIdEquals: post.authorId,
          categoryEquals: post.category,
          tagEquals: post.tag,
          titleContains: post.title,
        }),
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toHaveProperty("listPosts");
    expect(response.body.data.listPosts).toHaveProperty("posts");
    expect(response.body.data.listPosts.posts).toEqual([
      expect.objectContaining({
        id: post.id,
        isActive: post.isActive,
        content: post.content,
        description: post.description,
        authorId: post.authorId,
        title: post.title,
        tag: post.tag,
      }),
    ]);
  });
});
