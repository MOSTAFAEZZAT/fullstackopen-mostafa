const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {

  const body = request.body
  if(!body.title || !body.url  ){
    response.status(400).end({ error : 'title or url is missing' })
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  blog.save().then(saveBlog => {
    response.status(201).json(saveBlog)
  }).catch(error => next(error))
})

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const result= await Blog.deleteOne({ _id: id })
  response.status(204).end()
  if(result){
    response.status(204).end()
  }else{response.status(404).end()
  }
})

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const result = await Blog.findByIdAndUpdate(id, newBlog, { new: true })
  if (result) {
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})



module.exports = blogRouter