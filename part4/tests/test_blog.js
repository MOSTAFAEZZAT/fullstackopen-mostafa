const Blog = require('../models/blog')

const getBlog = async () => {
  const blog = await Blog.find({})
  return blog.map(blog => blog.toJSON())
}

const verifyId = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = { getBlog, verifyId }