import { PostCategoryType } from "@modules/posts/entities/post.entity";

export const UPDATE_POST_MUTATION = `
  mutation UpdatePost($updatePost: UpdatePostInput!) {
    updatePost(updatePostInput: $updatePost) {
      post {
        id
        title
        content
        description
        tag
        category
        publishedAt
        isActive
        authorId
      }
    }
  }`;

interface IParams {
  postId: string;
  title: string;
  content: string;
  category: PostCategoryType;
  description?: string | null;
}

export const generateUpdatePostVariables = (params: IParams) => {
  const { postId, category, content, title, description } = params;

  return {
    updatePost: {
      postId,
      category,
      content,
      title,
      description,
    },
  };
};

export const UPDATE_POST_OPERATION_NAME = "UpdatePost";
