export const UPDATE_AUTHOR_MUTATION = `
  mutation UpdateAuthor($updateAuthor: UpdateAuthorInput!) {
    updateAuthor(updateAuthorInput: $updateAuthor) {
      author {
        id
        name
        phone
        email
      }
    }
  }`;

interface IParams {
  email: string;
  password: string;
  name: string;
  phone: string;
}

export const generateUpdateAuthorVariables = (params: IParams) => {
  const { email, name, password, phone } = params;

  return {
    updateAuthor: {
      email,
      name,
      password,
      phone,
    },
  };
};

export const UPDATE_AUTHOR_OPERATION_NAME = "UpdateAuthor";
