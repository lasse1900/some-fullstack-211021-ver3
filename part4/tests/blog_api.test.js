const mongoose = require('mongoose')
const supertest = require('supertest')
// const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Lasse',
    url: 'https://www.apple.com/phones',
    likes: 1,
  },
  {
    title: 'Browser can execute only Javascript',
    author: 'Lasse',
    url: 'https://www.apple.com',
    likes: 2,
  },
]
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

describe('blogs are returned as json', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('basic tests', () => {
  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('the first blog is about: HTML is easy', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].title).toBe('HTML is easy')
  })

  test('blogs should have id instead of _id ', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('Valid Blog can be added ', () => {
  test('a valid Blog can be added ', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Lasse',
      url: 'https://www.google.fi',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const contents = response.body.map((r) => r.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(contents).toContain('async/await simplifies making async calls')
  })
})

describe('testing invalid inputs', () => {
  test('pass with status code 200 if likes is missing', async () => {
    await api
      .post('/api/blogs')
      .send({
        title: 'I pHone',
        author: 'Lasse',
        url: 'https://www.apple.com',
      })
      .expect(200)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length + 1)
  })

  test('fails with status code 400 if data is invalid', async () => {
    await api
      .post('/api/blogs')
      .send({
        author: 'Lasse',
      })
      .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
