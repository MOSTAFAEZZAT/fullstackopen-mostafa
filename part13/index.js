require('dotenv').config()
const { Sequelize, Model, DataTypes, QueryTypes  } = require('sequelize')
const express = require('express')
const app = express()
const sequelize = new Sequelize(process.env.DATABASE_URL);
const { connectToDb } = require('./util/db');
const blogsRouter = require('./controllers/blogs')
const { userRouter }  = require('./controllers/user');
const { authRouter } = require('./controllers/login');
const { extractToken } = require('./util/index');
const authorRouter = require('./controllers/authors');

app.use(express.json())

// app.use(extractToken);
app.use('/api/blogs', extractToken,  blogsRouter);
app.use('/api/users', userRouter);
app.use('/api/login', authRouter);
app.use('/api/authors', authorRouter);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

                                                       
const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: error.message })
  }
  else if (error.name === 'SequelizeValidationError') {
     
    return res.status(400).json({ error: error.message })
  }
  else{
    return res.status(400).json({ error: 'Something went wrong' , errorMessage: error.message })
  }
  next(error)
}

app.use(errorHandler)


const main = async () => {
  try {

    await connectToDb();
    await sequelize.authenticate();
    const blogs = await sequelize.query("SELECT * FROM blogs;", { type: QueryTypes.SELECT });
    // console.log('Connection has been established successfully.');
    // console.log(blogs[1]) ;
    blogs.map((blog) => {
        // console.log(i)
        //  console.log(blog[i], i)
      console.log( blog.author  + ' '+ blog.title  + ' ' + blog.url + ' ' + blog.likes + '\n' ) ;  
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

main();

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {    
  console.log(`Server running on port ${PORT}`)
})