export const AUTHENTICATE_MUTATION = `
  mutation Authenticate($authenticate: AuthenticateInput!) {
    authenticate(authenticateInput: $authenticate) {
      accessToken
    }
  }`;

interface IParams {
  email: string;
  password: string;
}

export const generateAuthenticateVariables = (params: IParams) => {
  const { password, email } = params;

  return {
    authenticate: {
      password,
      email,
    },
  };
};

export const AUTHENTICATE_OPERATION_NAME = "Authenticate";
