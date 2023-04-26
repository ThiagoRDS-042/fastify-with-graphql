import { PostCategoryType } from "@modules/posts/entities/post.entity";

export const LIST_POSTS_AUTHOR_QUERY = `
	query ListPostsAuthor($listPostsAuthor: ListPostsAuthorInput!) {
		listPostsAuthor(listPostsAuthorInput: $listPostsAuthor) {
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
  authorIdEquals: string;
  categoryEquals?: PostCategoryType;
  tagEquals?: string;
  titleContains?: string;
  publish?: boolean;
  isActive?: boolean;
}

export const generateListPostsAuthorVariables = (params: IParams) => {
  const {
    authorIdEquals,
    categoryEquals,
    isActive,
    publish,
    tagEquals,
    titleContains,
  } = params;

  return {
    listPostsAuthor: {
      authorIdEquals,
      categoryEquals,
      isActive,
      publish,
      tagEquals,
      titleContains,
    },
  };
};

export const LIST_POSTS_AUTHOR_OPERATION_NAME = "ListPostsAuthor";
