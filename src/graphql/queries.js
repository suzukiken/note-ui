/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const searchArticles = /* GraphQL */ `
  query SearchArticles($input: SearchInput) {
    searchArticles(input: $input) {
      id
      title
      content
      category
      tags
      date
      lank
      highlight {
        title
        content
        category
        tags
      }
    }
  }
`;
export const searchPrograms = /* GraphQL */ `
  query SearchPrograms($word: String) {
    searchPrograms(word: $word) {
      id
      url
      code
      highlight {
        code
      }
    }
  }
`;
