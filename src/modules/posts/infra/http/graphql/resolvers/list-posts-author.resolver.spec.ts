import request from "supertest";

import { app } from "@app";
import { makeCreatePost } from "./factories/make-create-post";
import {
  LIST_POSTS_AUTHOR_OPERATION_NAME,
  LIST_POSTS_AUTHOR_QUERY,
  generateListPostsAuthorVariables,
} from "@docs/graphql/posts/list-posts-author";
import { makeCreateAndAuthenticateAuthor } from "@modules/authors/infra/http/graphql/resolvers/factories/make-create-and-authenticate-author";

describe("List posts author (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list a posts", async () => {
    const { accessToken, author } = await makeCreateAndAuthenticateAuthor(app);

    const { post } = await makeCreatePost(author.id);

    const response = await request(app.server)
      .post("/graphql")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        operationName: LIST_POSTS_AUTHOR_OPERATION_NAME,
        query: LIST_POSTS_AUTHOR_QUERY,
        variables: generateListPostsAuthorVariables({
          authorIdEquals: post.authorId,
          categoryEquals: post.category,
          tagEquals: post.tag,
          titleContains: post.title,
          isActive: post.isActive,
          publish: false,
        }),
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toHaveProperty("listPostsAuthor");
    expect(response.body.data.listPostsAuthor).toHaveProperty("posts");
    expect(response.body.data.listPostsAuthor.posts).toEqual([
      expect.objectContaining({
        id: post.id,
        isActive: post.isActive,
        content: post.content,
        description: post.description,
        authorId: post.authorId,
        publishedAt: post.publishedAt,
        title: post.title,
        tag: post.tag,
      }),
    ]);
  });
});
