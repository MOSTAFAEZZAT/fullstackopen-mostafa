// index.js
const express = require('express')
const http = require('http')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const {
  ApolloServer
} = require('@apollo/server')
const {
  expressMiddleware
} = require('@apollo/server/express4')
const {
  ApolloServerPluginDrainHttpServer
} = require('@apollo/server/plugin/drainHttpServer')
const {
  makeExecutableSchema
} = require('@graphql-tools/schema')
const {
  WebSocketServer
} = require('ws')
const {
  useServer
} = require('graphql-ws/lib/use/ws')
require('dotenv').config()

// Import your typeDefs and resolvers
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

// Import your Mongo models (so you can use them in context/resolvers)
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

// 1️⃣ Connect to Mongo
mongoose.set('strictQuery', false)
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err.message))
mongoose.set('debug', true);

async function start() {
  const app = express()
  const httpServer = http.createServer(app)

 
  // app.options('*', cors())

  // 3️⃣ JSON parsing for HTTP POSTs
  // app.use(express.json())

  // 4️⃣ WebSocket server for subscriptions
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/', // subscriptions at ws://localhost:4000/
  })
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)

  // 5️⃣ ApolloServer with error‐logging plugin + graceful shutdown
  const server = new ApolloServer({
    schema,
    plugins: [
      // Log every GraphQL error
      {
        async requestDidStart() {
          return {
            didEncounterErrors(ctx) {
              console.error('❗️ GraphQL Errors:', ctx.errors)
            },
          }
        },
      },
      // Drain HTTP server on shutdown
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // Drain WS server on shutdown
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })
  await server.start()

  // 6️⃣ Mount Apollo’s HTTP middleware at `/`
  app.use(
      
    
    '/',
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
      methods: ['GET', 'POST', 'OPTIONS'],
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        // parse auth header
        const auth = req.headers.authorization || ''
        if (auth.startsWith('Bearer ')) {
          try {
            const decoded = jwt.verify(auth.slice(7), process.env.JWT_SECRET)
            const currentUser = await User.findById(decoded.id)
            return { currentUser }
          } catch (e) {
            console.warn('⚠️ Invalid JWT', e.message)
          }
        }
        return {}
      },
    })
  )

  // 7️⃣ Launch HTTP+WS on port 4000
  const PORT = 4000
  httpServer.listen(PORT, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}/`)
  )
}

start().catch(err => {
  console.error('❌ Server failed to start:', err)
})
