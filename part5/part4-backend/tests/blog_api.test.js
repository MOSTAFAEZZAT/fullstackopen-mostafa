const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_blog.js')
const app = require('../app.js')
const api = supertest(app)
const Blog = require('../models/blog.js')
const User = require('../models/user.js')
const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    id: '6611ad0531c72f3ca2719eec',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes:  5 ,
  },
  {
    id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

describe('get blogs from database', async() => {
  const response = await api.get('/api/blogs')
  const titles = response.body.map(e => e.title)
  assert(titles.includes('Go To Statement Considered Harmful'))
})

test('verify id', async () => {
  const blogs = await helper.verifyId()
  const id = blogs.map(blog => Object.keys(blog).includes('id') ? 'id' : false)
  id.map(id => assert.strictEqual(id , 'id'))
})

describe('HTTP requests to the /api/blogs URL' , async () => {

  test('POST request to the /api/blogsand check total blogs number', async () => {
    const objBlog =  {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
    }
    await api.post('/api/blogs').send(objBlog).expect('Content-Type',/application\/json/).expect(201)

    const response = await api.get('/api/blogs')
    const author = response.body.map(blog => blog.author)
    assert.strictEqual(response.body.length, initialBlogs.length +1 )
    assert(author.includes('Robert C. Martin'))
  })

  test('save blog while checking the likes property', async () => {
    const objBlog =  {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    }
    const checkBlogId = Object.keys(objBlog).includes('likes') ? true : false
    if(!checkBlogId){
      objBlog['likes'] = 0
    }
    await api.post('/api/blogs').send(objBlog).expect(201).expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    const checkLikes = response.body.map(blog => blog.likes)
    assert(!checkLikes.includes(undefined))
  })


  test('create new blogs via the /api/blogs endpoint, that verify that if the title or url properties are missing ', async () => {
    const objBlog =  {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    }
    const checkBlogId = Object.keys(objBlog).includes('likes') ? true : false
    if(!checkBlogId){
      objBlog['likes'] = 0
    }
    await api.post('/api/blogs').send(objBlog).expect(201).expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    const checkLikes = response.body.map(blog => blog.likes)
    assert(!checkLikes.includes(undefined))
  })

  test('Save a blog into a database and check the title and url', async () => {

    const objBlog =  {
      id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    }
    await api.post('/api/blogs').send(objBlog).expect(201)
  })
})

describe('DELETE AND UPDATE' , async () => {
  test('Delete a blog from database', async () => {
    const id = initialBlogs[0].id
    await api.delete(`/api/blogs/${id}`).expect(204)
  })
  const user = await api.post('/api/login').send({ username:'tessssst', password:'tessssst' })
  const token = 'Bearer ' + user.body.token 
  test('Update a blog from database', async () => {
    const blogs = await helper.getBlog()
    const id = blogs[0].id
    const updatedLikes =  blogs[0].likes + 10

    const newBlog = {
      id: id,
      title: blogs[0].title,
      author: blogs[0].author,
      url: blogs[0].url,
      likes: updatedLikes,
    }
    await api.put(`/api/blogs/${id}`).send(newBlog).set('Authorization', token).expect(204)
  })
})

describe('when there is initially one user in db', () => {

  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })
})

describe('test blogs, token and users', () => {
  test('create user' , async () => {
    const newUser = {
      username: 'tessssst',
      name: 'Matti Luukkainen',
      password: 'tessssst',
    }
    if(!(newUser.password.length >= 3) || !(newUser.username.length >= 3)){
      assert.strictEqual(newUser.password.length >= 3)
      assert.strictEqual(newUser.password.length >= 3)
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })
})

test('test token based auth for creating a blog' , async() => {
  const blog = {
    title: '4.18: Blog List Expansion, step 6',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    userId: '66257359ecb3762096aecf96'
  }

  const user = await api.post('/api/login').send({ username:'tessssst', password:'tessssst' })
  const token = 'Bearer ' + user.body.token
  await api.post('/api/blogs').set('Authorization', token).send(blog).expect(201)
})

after(async () => {
  await mongoose.connection.close()
})