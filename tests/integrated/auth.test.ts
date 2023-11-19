import User from '../../src/models/User'
import request from 'supertest'
import app from '../../src/main'
import database from '../../src/utils/database'
import { disconnect } from 'mongoose'

beforeAll(async () => database())

afterAll(async () => disconnect())

describe('POST /api/v1/auth/signup', () => {
  afterEach(async () => await User.deleteMany())

  test('OK', async () => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({ name: 'John Doe', email: 'john@example.com', password: 'john_' })

    expect(res.status).toEqual(201)
  })

  test('Bad Request', async () => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({})

    expect(res.status).toEqual(400)
  })
})