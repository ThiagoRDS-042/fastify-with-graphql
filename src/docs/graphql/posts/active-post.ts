export const ACTIVE_POST_MUTATION = `
	mutation ActivePost($activePost: ActivePostInput!) {
  	activePost(activePostInput: $activePost)
	}`;

interface IParams {
  postId: string;
}

export const generateActivePostVariables = (params: IParams) => {
  const { postId } = params;

  return {
    activePost: {
      postId,
    },
  };
};

export const ACTIVE_POST_OPERATION_NAME = "ActivePost";
