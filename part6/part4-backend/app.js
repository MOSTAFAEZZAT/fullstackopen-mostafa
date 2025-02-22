const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const usersRouter = require ('./controllers/user')
const loginRouter = require('./controllers/login')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.extractToken)

app.use('/api/notes', middleware.userExtractor, notesRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  console.log('thiss testing')
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app