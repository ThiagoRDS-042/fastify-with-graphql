import request from "supertest";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";

import { Author } from "@modules/authors/entities/author.entity";
import { makeAuthor } from "@modules/authors/repositories/in-memory/factories/make-author";
import { PrismaAuthorsRepository } from "@modules/authors/infra/prisma/repositories/prisma-authors-repository";
import {
  AUTHENTICATE_MUTATION,
  AUTHENTICATE_OPERATION_NAME,
  generateAuthenticateVariables,
} from "@docs/graphql/authors/authenticate";

interface IResponse {
  author: Author;
  accessToken: string;
}

export const makeCreateAndAuthenticateAuthor = async (
  app: FastifyInstance
): Promise<IResponse> => {
  const authorsRepository = new PrismaAuthorsRepository();

  const email = "author.test-e2e@example.com.br";
  const password = "Test-E2E";

  const author = makeAuthor({
    email,
    name: "Author Test e2e",
    password: await hash(password, 10),
    phone: "12345678",
  });

  await authorsRepository.create(author);

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

  const { accessToken } = response.body.data.authenticate;

  return {
    accessToken,
    author,
  };
};
