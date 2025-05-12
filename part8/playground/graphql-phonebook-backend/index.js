const { ApolloServer } = require('@apollo/server')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { expressMiddleware } = require('@apollo/server/express4')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')

const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Person = require('./models/person')
const User = require('./models/user')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

async function start() {
  const app = express()
  const httpServer = http.createServer(app)

  // 1️⃣ CORS & Preflight (must come first)
  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
  }))
  app.options('*', cors())

  // 2️⃣ JSON body parsing
  app.use(express.json())

  // 3️⃣ WebSocket server for subscriptions at path '/'
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)

  // 4️⃣ ApolloServer with error‐logging plugin
  const server = new ApolloServer({
    schema,
    plugins: [
      // Log all GraphQL errors to the console
      {
        async requestDidStart() {
          return {
            didEncounterErrors(ctx) {
              console.error('❗️ GraphQL Errors:', ctx.errors)
            }
          }
        }
      },
      // Proper shutdown of the HTTP server
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // Proper shutdown of the WS server
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            }
          }
        }
      },
    ]
  })
  await server.start()

  // 5️⃣ Mount Apollo over HTTP at '/'
  app.use(
    '/',
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req.headers.authorization || ''
        if (auth.startsWith('Bearer ')) {
          try {
            const decoded = jwt.verify(auth.slice(7), process.env.JWT_SECRET)
            const currentUser = await User.findById(decoded.id)
            return { currentUser }
          } catch (e) {
            console.warn('⚠️ Invalid token', e.message)
          }
        }
        return {}
      },
    })
  )

  // 6️⃣ Start the HTTP & WS server
  const PORT = 4000
  httpServer.listen(PORT, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}/`)
  )
}

start().catch(err => {
  console.error('Server failed to start', err)
})