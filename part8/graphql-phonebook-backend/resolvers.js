
const Book = require('../graphql-phonebook-backend/models/book.js');
const Author = require('../graphql-phonebook-backend/models/author.js');
const User = require('../graphql-phonebook-backend/models/user.js');
const { GraphQLError } = require('graphql');
const { PubSub } = require('graphql-subscriptions');
const jwt = require('jsonwebtoken');  
  const pubsub = new PubSub();

  const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    allBooks: async (root, args) => {
      let filter = {};
      if (args.genre) {
        filter.genres = { $in: [args.genre] };
      }

      if (args.author) {
        const authorDoc = await Author.findOne({ name: args.author });
        if (!authorDoc) return []; // no books if author doesn't exist
        filter.author = authorDoc._id;
      }

      return Book.find(filter).populate('author');
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => context.currentUser,
  },

  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })

      if (args.published < 0) {
        throw new GraphQLError('Published year cannot be negative', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.published },
        });
      }

      if (args.title.length < 5) {
        throw new GraphQLError('Title cannot be empty', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.title },
        });
      }

      if (!author) {
        author = new Author({ name: args.author });
        await author.save();
      }

      const newBook = new Book({ ...args, author: author._id });
      const savedBook = await newBook.save();
      const populatedBook = await savedBook.populate('author');

      pubsub.publish('BOOK_ADDED', { bookAdded: savedBook });
      console.log('📢 Published BOOK_ADDED');

      return populatedBook;
    },

    editAuthor: () => null,

    createUser: async (root, args) => {
      const user = new User({ ...args });
      try {
        await user.save();
      } catch (error) {
        throw new GraphQLError('Creating user failed', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.username, error },
        });
      }
      return user;
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      const token = jwt.sign(userForToken, process.env.JWT_SECRET, { expiresIn: 60 * 60 });

      return { value: token, favoriteGenre: user.favoriteGenre };
    },
  },

    Subscription: {
    bookAdded: {
      subscribe: () => {
        console.log('🧲 Subscribed to BOOK_ADDED');
        return pubsub.asyncIterator('BOOK_ADDED');
      },
    },
  },

  // Book: {
  //   author: async (root) => {
  //     const populatedBook = await Book.findById(root.id).populate('author');
  //     return populatedBook.author;
  //   },
  // },

  Author: {
    bookCount: (root) => null,
  },
};

module.exports = resolvers;