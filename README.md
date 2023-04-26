<h1 align="center">Posts API :computer:</h1>

<br>

## ✨ Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Typescript](https://www.typescriptlang.org)
- [Postgres](https://www.postgresql.org)
- [Prisma](https://www.prisma.io)
- [Docker](https://www.docker.com)
- [Jest](https://jestjs.io/pt-BR/)
- [TypeGraphQL](https://typegraphql.com)
- [Mercurius](https://mercurius.dev/#/)
- [Fastify](https://www.fastify.io)

## 🚀 Como executar a aplicação

- Executando a aplicação:

  - **aplicação**
    - Abra o terminal e digite `yarn ou yarn install` para instalar todas as dependências do projeto.
    - Manipule suas variáveis de ambiente para o uso, ex: `.env`.
    - No mesmo terminal digite `yarn migrate:dev` para criar as tabelas do bando de dados.
    - Ainda no mesmo terminal agora digite `yarn dev` para iniciar a aplicação.
    - Por fim, a aplicação estará disponível em `http://localhost:${SERVER_PORT}`.

- Rodando os testes:

  - **jest**
    - Abra o terminal e digite `yarn test` para iniciar os testes unitários.
    - Abra o terminal e digite `yarn test:e2e` para iniciar os testes de ponta a ponta. Obs: É necessário já está conectado ao banco de dados.
    - Abra o terminal e digite `yarn test:all` para iniciar todos os testes.

- Documentação da aplicação:

  - **Insomnia**

    - Há um arquivo do insomnia em 'src/docs/insomnia/insomnia.json' importe em seu aplicativo e teste as requisições.

  - **Diagrama**
    - [Diagrama ERD](./src/docs/diagrams/diagram_erd.md)

### Autor

---

Feito por ❤️ Thiago Rodrigues 👋🏽
