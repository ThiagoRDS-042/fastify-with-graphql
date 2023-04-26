import request from "supertest";
import { hash } from "bcryptjs";

import { app } from "@app";
import { makeAuthor } from "@modules/authors/repositories/in-memory/factories/make-author";
import { PrismaAuthorsRepository } from "@modules/authors/infra/prisma/repositories/prisma-authors-repository";
import {
  AUTHENTICATE_MUTATION,
  AUTHENTICATE_OPERATION_NAME,
  generateAuthenticateVariables,
} from "@docs/graphql/authors/authenticate";

describe("Authenticate (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate a author", async () => {
    const authorsRepository = new PrismaAuthorsRepository();

    const email = "author.test-e2e@example.com.br";
    const password = "Test-E2E";

    await authorsRepository.create(
      makeAuthor({
        email,
        name: "Author Test e2e",
        password: await hash(password, 10),
        phone: "12345678",
      })
    );

    const response = await request(app.server)
      .post("/graphql")
      .send({
        operationName: AUTHENTICATE_OPERATION_NAME,
        query: AUTHENTICATE_MUTATION,
        variables: generateAuthenticateVariables({
          email,
          password,
        }),
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toHaveProperty("authenticate");
    expect(response.body.data.authenticate).toHaveProperty("accessToken");
    expect(response.body.data.authenticate.accessToken).toEqual(
      expect.any(String)
    );
  });
});
