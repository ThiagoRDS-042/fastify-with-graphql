import { MercuriusError } from "mercurius";

export const isInterfaceMercuriusError = (
  type: unknown
): type is MercuriusError => {
  if (typeof type === "object" && type !== null)
    return (
      "code" in type &&
      "name" in type &&
      "statusCode" in type &&
      "errors" in type
    );
};
