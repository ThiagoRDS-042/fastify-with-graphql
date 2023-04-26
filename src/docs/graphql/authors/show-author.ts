export const SHOW_AUTHOR_QUERY = `
  query ShowAuthor {
    showAuthor {
      author {
        id
        name
        email
        phone
      }
    }
  }`;

export const SHOW_AUTHOR_OPERATION_NAME = "ShowAuthor";
