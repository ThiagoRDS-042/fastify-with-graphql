export const DEPRIVE_POST_MUTATION = `
  mutation DeprivePost($deprivePost: DeprivePostInput!) {
    deprivePost(deprivePostInput: $deprivePost)
  }`;

interface IParams {
  postId: string;
}

export const generateDeprivePostVariables = (params: IParams) => {
  const { postId } = params;

  return {
    deprivePost: {
      postId,
    },
  };
};

export const DEPRIVE_POST_OPERATION_NAME = "DeprivePost";
