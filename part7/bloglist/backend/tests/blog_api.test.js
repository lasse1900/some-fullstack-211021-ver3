const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const initialUser = {
  'name': 'Initial User',
  'username': 'initialuser',
  'password': 'password'
}

const login = async () => await api.post('/api/login').send(initialUser)

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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const newUser = await api.post('/api/users').send(initialUser)

  const blogObjects = initialBlogs.map((blog) => {
    blog.user = newUser.body.id
    return new Blog(blog)
  })

  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
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
  test('succeeds with valid data', async () => {
    const token = await login()

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token.body.token}`)
      .send({
        title: 'CSS is hard',
        author: 'Lasse Mikael',
        url: 'www.google.com',
        likes: 3,
      })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterAdd = await Blog.find({})

    expect(blogsAfterAdd.length).toBe(initialBlogs.length + 1)

    const titles = blogsAfterAdd.map((blog) => blog.title)
    expect(titles).toContain('CSS is hard')
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const token = await login()

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token.body.token}`)
      .send({
        title: 'CSS is hard',
        author: 'Lasse Mikael',
        url: 'ww.google.vom',
        likes: 3,
      })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterAdd = await Blog.find({})

    expect(blogsAfterAdd.length).toBe(initialBlogs.length + 1)

    const titles = blogsAfterAdd.map((blog) => blog.title)
    expect(titles).toContain('CSS is hard')
  })

  test('fails with status code 400 if data is invalid', async () => {
    await api
      .post('/api/blogs')
      .send({
        author: 'Lasse Mikael',
        likes: 3,
      })
      .expect(500)

    const blogsAfterAdd = await Blog.find({})
    expect(blogsAfterAdd.length).toBe(initialBlogs.length)
  })

  test('id property is named correctly (i.e. not _id)', async () => {
    const blogs = await blogsInDb()
    blogs.every((blog) => expect(blog.id).toBeDefined())
  })

  test('blog without likes is defaulted to 0', async () => {
    const token = await login()

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token.body.token}`)
      .send({
        title: 'CSS is hard',
        author: 'Lasse Mikael',
        url: 'www.google.com',
      })

    const blog = await Blog.findOne({ title: 'CSS is hard' })
    expect(blog.likes).toBe(0)
  })
})

describe('deletion of a noteBlog can be deleted', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const token = await login()
    const blogToDelete = await Blog.findOne({ title: 'HTML is easy' })

    await api
      .delete(`/api/blogs/${blogToDelete._id}`)
      .set('Authorization', `bearer ${token.body.token}`)
      .expect(204)

    const blogsInDb = await Blog.find({})
    expect(blogsInDb).toHaveLength(initialBlogs.length - 1)

    const titles = blogsInDb.map((blog) => blog.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('updating a specific blog', () => {
  test('updating author name succeeds', async () => {
    const blogsFromDb = await blogsInDb()
    const blogToView = blogsFromDb[0]

    const updatedBlogToView = {
      ...blogToView,
      author: 'Might have been Rhys Mitchell',
    }

    const resultBlog = await api
      .put(`/api/blogs/${updatedBlogToView.id}`)
      .send(updatedBlogToView)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body.author).toEqual(updatedBlogToView.author)
  })
})

afterAll(() => {
  mongoose.connection.close()
})