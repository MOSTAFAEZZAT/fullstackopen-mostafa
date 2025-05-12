
const typeDefs = `

type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }    

type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  } 

type bookCount {    
    published: Int!   
  }

  type User { 
    username: String!
    favoriteGenre: String!
    id: ID!
  }

type Query {
    bookCount: Int
    authorCount: Int
    allBooks(genre: String, author: String): [Book!]!   
    allAuthors: [Author!]!
    me: User
  }

  type Token {
  value: String!
  favoriteGenre: String!
  }
type Subscription {
    bookAdded: Book!
    }
type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book 

    editAuthor(
      name: String!
      setBornTo:  Int!
    ): Author
    createUser(
    username: String!
    favoriteGenre: String!
  ): User

  login(
    username: String!
    password: String!
  ): Token

  
}

`
module.exports = typeDefs;