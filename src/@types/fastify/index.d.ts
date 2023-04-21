import "@fastify/jwt";

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    payload: {
      name: string;
    };

    user: {
      sub: string;
      name: string;
    };
  }
}
