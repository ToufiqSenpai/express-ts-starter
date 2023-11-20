import User from '../../src/models/User'
import request from 'supertest'
import app from '../../src/main'
import database from '../../src/utils/database'
import { disconnect } from 'mongoose'

beforeAll(async () => database())

afterAll(async () => disconnect())

describe('POST /api/v1/auth/signup', () => {
  afterEach(async () => await User.deleteOne({ email: 'john@example.com' }))

  test('OK (Signup success)', async () => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({ name: 'John Doe', email: 'john@example.com', password: 'john_' })

    expect(res.status).toEqual(201)
    expect(res.body.errors).toBeUndefined()
  })

  test('Bad Request (Signup failed)', async () => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({})

    expect(res.status).toEqual(400)
    expect(res.body.errors).toBeDefined()
    expect(res.body.errors.name.length).toEqual(1)
    expect(res.body.errors.email.length).toEqual(2)
    expect(res.body.errors.password.length).toEqual(1)
  })

  it('should have error message email not valid', async () => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({ name: 'John Doe', email: 'johnxamplecom', password: 'john_' })

    expect(res.status).toEqual(400)
    expect(res.body.errors.email.includes('Email is not valid.')).toBeTruthy()
  })

  it('should response bad request if email is already registered', async () => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({ name: 'John Doe', email: 'john@example.com', password: 'john_' })

    expect(res.status).toEqual(201)

    const res2 = await request(app)
      .post('/api/v1/auth/signup')
      .send({ name: 'John Doe', email: 'john@example.com', password: 'john_' })

    expect(res2.status).toEqual(400)
    expect(res2.body.errors.email.includes('Email is already exist.')).toBeTruthy()
  })
})

describe('POST /api/v1/auth/login', () => {
  beforeEach(async () => {
    await request(app)
      .post('/api/v1/auth/signup')
      .send({ name: 'John Doe', email: 'john@example.com', password: 'john_' })
  })

  afterEach(async () => {
    await User.deleteOne({ email: 'john@example.com' })
  })

  test('OK (Login success)', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'john@example.com', password: 'john_' })

    expect(res.status).toEqual(200)
    expect(res.body.errors).toBeUndefined()
    expect(res.body.token).toBeDefined()
  })

  test('Unauthorized (Login Failed)', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'johnexample.com', password: 'doe_' })

    expect(res.status).toEqual(401)
  })
})