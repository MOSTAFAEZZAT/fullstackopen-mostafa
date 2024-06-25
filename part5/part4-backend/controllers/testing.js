const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
    try{
    await Blog.deleteMany({})
    await User.deleteMany({})
    response.status(204).end()
  }catch(err){
    console.log(err)
    response.status(400).end(err)

  }
})

module.exports = router