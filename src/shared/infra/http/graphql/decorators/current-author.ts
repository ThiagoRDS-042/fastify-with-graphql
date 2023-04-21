import { MercuriusContext } from "mercurius";
import { createParamDecorator } from "type-graphql";

export interface ICurrentAuthor {
  sub: string;
  name: string;
}

export const CurrentAuthor = () => {
  return createParamDecorator<MercuriusContext>(
    ({ context }) => context.reply.request.user
  );
};
