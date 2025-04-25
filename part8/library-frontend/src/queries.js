import { gql } from '@apollo/client';
export const BOOKS_QUERY = gql`
    query{
      allBooks(author: "", genre: "") { 
        title,
        author,
        published
      }
    }
    `
export const AUTHORS_QUERY = gql`   
    query {
      allAuthors {
        name
        born
        bookCount
      }
    }
  ` 

export const NEW_BOOK = gql `
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author 
      published
      genres}
      }`  

 