const { AuthenticationError, UserInputError } = require("apollo-server")

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Book = require("./models/book")
const Author = require("./models/author")
const User = require("./models/user")

const jwt = require("jsonwebtoken")
const JWT_SECRET=process.env.SECRET

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
        allAuthors: async () => Author.find({}).populate('books'),
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Author: {
        bookCount: async (root) => {
            return root.books.length;
        },
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new AuthenticationError('not authenticated')
            }

            const author =
                (await Author.findOne({ name: args.author })) ||
                new Author({ name: args.author })

            try {
                await author.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: { author: args.author },
                })
            }

            const book = new Book({ ...args, author })

            try {
                await book.save()
                await author.updateOne({ $push: { books: book } })
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }

            pubsub.publish('BOOK_ADDED', { bookAdded: book })
            return await book.populate('author')
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new AuthenticationError('not authenticated')
            }

            const author = await Author.findOne({ name: args.name })

            if (!author) {
                return null
            }
            author.born = args.setBornTo

            try {
                await author.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: { setBornTo: args.setBornTo },
                })
            }

            return author
        },
        createUser: async (root, args) => {
            const user = new User({ ...args })

            try {
                await user.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: { ...args },
                })
            }
            return user
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if ( !user || args.password !== 'secret' ) {
                throw new UserInputError("wrong credentials")
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
        },
    },
}

module.exports = resolvers