const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

const initialUsers = [
  {
    'name': 'Initial User',
    'username': 'initialuser',
    'password': 'password'
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

beforeEach(async () => {
  await User.deleteMany({})

  const userObjects = initialUsers.map((user) => new User(user))
  const promiseArray = userObjects.map((user) => user.save())
  await Promise.all(promiseArray)
})

describe('Adding users', () => {
  test('Adding user without username should fail', async () => {
    await api
      .post('/api/users')
      .send({
        name: 'Lasse Manner',
        password: 'password',
      })
      .expect(400)

    const usersFromDb = await usersInDb()
    expect(usersFromDb).toHaveLength(initialUsers.length)
  })

  test('Adding user without password should fail', async () => {
    await api
      .post('/api/users')
      .send({
        name: 'Lasse Manner',
        username: 'Lasse Manner',
      })
      .expect(400)

    const usersFromDb = await usersInDb()
    expect(usersFromDb).toHaveLength(initialUsers.length)
  })

  test('Adding user with password less than 3 characters should fail', async () => {
    await api
      .post('/api/users')
      .send({
        username: 'Lasse',
        name: 'Lasse Manner',
        password: 'pa',
      })
      .expect(400)

    const usersFromDb = await usersInDb()
    expect(usersFromDb).toHaveLength(initialUsers.length)
  })

  test('Adding user with username less than 3 characters should fail', async () => {
    await api
      .post('/api/users')
      .send({
        username: 'rh',
        name: 'Lasse Manner',
        password: 'password',
      })
      .expect(400)

    const usersFromDb = await usersInDb()
    expect(usersFromDb).toHaveLength(initialUsers.length)
  })

  test('Adding user with correct credentials should succeed', async () => {
    await api
      .post('/api/users')
      .send({
        username: 'Lasse',
        name: 'Lasse Manner',
        password: 'password',
      })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersFromDb = await usersInDb()
    expect(usersFromDb).toHaveLength(initialUsers.length + 1)
  })

  test('Adding users with duplicate username should fail', async () => {
    await api
      .post('/api/users')
      .send({
        'name': 'Initial User',
        'username': 'initialuser',
        'password': 'password'
      })
      .expect(400)

    const usersFromDb = await usersInDb()
    expect(usersFromDb).toHaveLength(initialUsers.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
