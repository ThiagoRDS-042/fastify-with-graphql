import { PostCategoryType } from "@modules/posts/entities/post.entity";

export const LIST_POSTS_QUERY = `
  query ListPosts($listPosts: ListPostsInput) {
    listPosts(listPostsInput: $listPosts) {
      posts {
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
  authorIdEquals?: string;
  categoryEquals?: PostCategoryType;
  tagEquals?: string;
  titleContains?: string;
}

export const generateListPostsVariables = (params: IParams) => {
  const { authorIdEquals, categoryEquals, tagEquals, titleContains } = params;

  return {
    listPosts: {
      authorIdEquals,
      categoryEquals,
      tagEquals,
      titleContains,
    },
  };
};

export const LIST_POSTS_OPERATION_NAME = "ListPosts";
