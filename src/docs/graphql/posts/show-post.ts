export const SHOW_POST_QUERY = `
  query ShowPost($showPost: ShowPostInput!) {
    showPost(showPostInput: $showPost) {
      post {
        id
        title
        content
        description
        tag
        publishedAt
        isActive
        authorId
      }
    }
  }`;

interface IParams {
  postId: string;
}

export const generateShowPostVariables = (params: IParams) => {
  const { postId } = params;

  return {
    showPost: {
      postId,
    },
  };
};

export const SHOW_POST_OPERATION_NAME = "ShowPost";
