import { app } from "@app";
import request from "supertest";

describe("Create author (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should create a new author", async () => {
    await request(app.server)
      .post("/graphql")
      .send({
        operationName: "CreateAuthor",
        query: `
        mutation CreateAuthor($createAuthor: CreateAuthorInput!) {
          createAuthor(createAuthorInput: $createAuthor) {
            author {
              id
              name
              email
             phone
            }
          }
        }`,
        variables: {
          createAuthor: {
            name: "Author test",
            email: "author.test@mail.com.br",
            phone: "23878655643",
            password: "Strong-password",
          },
        },
      });
  });
});
