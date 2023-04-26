export const LIST_AUTHORS_QUERY = `
  query ListAuthors($listAuthors: ListAuthorsInput) {
    listAuthors(listAuthorsInput: $listAuthors) {
      authors {
        id
        name
        email
        phone
      }
    }
  }`;

interface IParams {
  nameContains?: string;
  emailContains?: string;
}

export const generateListAuthorsVariables = (params: IParams) => {
  const { emailContains, nameContains } = params;

  return {
    listAuthors: {
      emailContains,
      nameContains,
    },
  };
};

export const LIST_AUTHOR_OPERATION_NAME = "ListAuthors";
