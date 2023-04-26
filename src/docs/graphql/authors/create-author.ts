export const CREATE_AUTHOR_MUTATION = `
  mutation CreateAuthor($createAuthor: CreateAuthorInput!) {
    createAuthor(createAuthorInput: $createAuthor) {
      author {
        id
        name
        email
        phone
      }
    }
  }
`;

interface IParams {
  email: string;
  password: string;
  name: string;
  phone: string;
}

export const generateCreateAuthorVariables = (params: IParams) => {
  const { password, email, name, phone } = params;

  return {
    createAuthor: {
      password,
      email,
      name,
      phone,
    },
  };
};

export const CREATE_AUTHOR_OPERATION_NAME = "CreateAuthor";
