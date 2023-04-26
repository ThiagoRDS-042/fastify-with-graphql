export const INACTIVE_POST_MUTATION = `
	mutation InactivePost($inactivePost: InactivePostInput!) {
		inactivePost(activePostInput: $inactivePost)
	}`;

interface IParams {
  postId: string;
}

export const generateInactivePostVariables = (params: IParams) => {
  const { postId } = params;

  return {
    inactivePost: {
      postId,
    },
  };
};

export const INACTIVE_POST_OPERATION_NAME = "InactivePost";
