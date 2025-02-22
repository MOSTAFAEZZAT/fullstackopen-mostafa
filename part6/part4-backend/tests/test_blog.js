const Blog = require('../models/blog')
const User = require('../models/user')
const getBlog = async () => {
  const blog = await Blog.find({})
  return blog.map(blog => blog.toJSON())
}

const verifyId = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {

  const users = await User.find({})
  return users.map(u => u.toJSON())

}
module.exports = { getBlog, verifyId , usersInDb }