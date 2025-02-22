const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt =  require('jsonwebtoken')
const middleware = require('../utils/middleware')

const verifyToken = (request) => {
  const token = request.get('authorization')
  if(token.startsWith('Bearer ')){
    return token.replace('Bearer ', '')
  }
  return null
}

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogRouter.post('/', middleware.userExtractor,  async (request, response) => {
  const body = request.body
  if(!body.title || !body.url){
    response.status(400).end({ error : 'title or url is missing' })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })
  user.blogs.push()
  const savedBlog = await blog.save()
  await user.blogs.push(savedBlog._id.toString())
  user.save()
  response.status(201).json(savedBlog)

})

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blog = await Blog.findById(id)
  if (!blog) {
    return response.status(404).end()
  }

  if (blog.user.toString() !== decodedToken.id.toString()) {
    return response.status(401).json({ error: 'unauthorized' })
  }

  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})


blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body
  if(!body.title || !body.url){
    response.status(400).end({ error : 'title or url is missing' })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  console.log(request.body)
  const user = User.findById(decodedToken.id)
  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  }
  const result = await Blog.findByIdAndUpdate(id, newBlog, { new: true })
  if (result) {
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})



module.exports = blogRouter