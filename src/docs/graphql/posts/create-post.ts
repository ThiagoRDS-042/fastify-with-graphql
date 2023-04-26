import { PostCategoryType } from "@modules/posts/entities/post.entity";

export const CREATE_POST_MUTATION = `
  mutation CreatePost($createPost: CreatePostInput!) {
    createPost(createPostInput: $createPost) {
      post {
        id
        title
        content
        tag
        description
        publishedAt
        isActive
        authorId
      }
    }
  }`;

interface IParams {
  title: string;
  content: string;
  category: PostCategoryType;
  description?: string | null;
}

export const generateCreatePostVariables = (params: IParams) => {
  const { category, content, title, description } = params;

  return {
    createPost: {
      category,
      content,
      title,
      description,
    },
  };
};

export const CREATE_POST_OPERATION_NAME = "CreatePost";
