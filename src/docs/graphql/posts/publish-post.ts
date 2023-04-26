export const PUBLISH_POST_MUTATION = `
  mutation PublishPost($publishPost: PublishPostInput!) {
    publishPost(publishPostInput: $publishPost)
  }`;

interface IParams {
  postId: string;
}

export const generatePublishPostVariables = (params: IParams) => {
  const { postId } = params;

  return {
    publishPost: {
      postId,
    },
  };
};

export const PUBLISH_POST_OPERATION_NAME = "PublishPost";
