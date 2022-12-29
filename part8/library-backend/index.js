const {
    ApolloServer,
    UserInputError,
    gql,
} = require('apollo-server')

const mongoose = require('mongoose')
require('dotenv').config()
const Book = require('./models/book')
const Author = require('./models/author')

const MONGODB_URI=process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            const books = await Book.find({}).populate('author')
            let filteredBooks = [...books]

            if (args.author) {
                filteredBooks = filteredBooks
                    .filter(book => book.author.name === args.author)
            }

            if (args.genre) {
                filteredBooks = filteredBooks
                    .filter(book => book.genres.includes(args.genre))
            }

            return filteredBooks
        },
        allAuthors: async () => Author.find({})
    },
    Author: {
        bookCount: async (root) => {
            const author = await Author.find({ name: root.name })
            const countedBooks = await Book.countDocuments({ author })
            return countedBooks
        }
    },
    Mutation: {
        addBook: async (root, args) => {
            const author = await Author.findOne({ name : args.author })

            if (!author) {
                const newAuthor = new Author({ name: args.author })

                try {
                    await newAuthor.save()
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: { author: args.author }
                    })
                }
            }

            const book = new Book({ ...args, author })
            
            try {
                await book.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }

            return book
        },
        editAuthor: async (root, args) => {
            const author = await Author.findOne({ name : args.name })

            if (author) {
                author.born = args.setBornTo

                try {
                    await author.save()
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: { setBornTo: args.setBornTo },
                    })
                }
                return author
            }
            return null
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})