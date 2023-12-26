import database from "../../src/utils/database";
import { disconnect } from "mongoose";
import getToken from "../utils/getToken";
import Todo from "../../src/models/Todo";
import request from "supertest";
import app from "../../src/main";

let token: string

beforeEach(async () => {
  token = await getToken()
})

beforeAll(async () => database())

afterAll(async () => disconnect())

describe('POST /api/v1/todos', () => {
  afterEach(async () => {
    Todo.deleteMany()
  })

  test('Created', async () => {
    const isoDate = (new Date()).toISOString()
    const res = await request(app)
      .post('/api/v1/todos')
      .set('Authorization', 'Bearer ' + token)
      .send({ date: isoDate })
      
    expect(res.status).toEqual(201)
    expect(res.body.createdAt).toEqual(isoDate)
  })

  test('Bad Request', async () => {
    const res = await request(app)
      .post('/api/v1/todos')
      .set('Authorization', 'Bearer ' + token)
      .send({ date: 'fwouhfwe' })

    expect(res.status).toEqual(400)
  })

  it('should rejected if date prop is undefined', async () => {
    const res = await request(app)
      .post('/api/v1/todos')
      .set('Authorization', 'Bearer ' + token)
      .send({ })

    expect(res.status).toEqual(400)
  })

  it('should rejected if todo on same date is already exists', async () => {
    const isoDate = (new Date()).toISOString()
    const res = await request(app)
      .post('/api/v1/todos')
      .set('Authorization', 'Bearer ' + token)
      .send({ date: isoDate })

    expect(res.status).toEqual(201)

    const res2 = await request(app)
      .post('/api/v1/todos')
      .set('Authorization', 'Bearer ' + token)
      .send({ date: isoDate })

    expect(res2.status).toEqual(400)
    expect(res2.body.errors.date.includes('Todo on this date is already exists.')).toBeTruthy()
  })
})

describe('POST /api/v1/todos/{todoDate}/tasks', () => {
  let todoDate: string

  beforeEach(async () => {
    const date = new Date()
    await request(app)
      .post('/api/v1/todos')
      .set('Authorization', 'Bearer ' + token)
      .send({ date: date.toISOString() })

    todoDate = date.toISOString()
  })

  afterEach(async () => {
    await Todo.deleteMany()
  })

  test('OK', async () => {
    const res = await request(app)
      .post(`/api/v1/todos/${todoDate}/tasks`)
      .set('Authorization', 'Bearer ' + token)
      .send({ name: 'Menyapu Halaman' })

    expect(res.status).toEqual(201)
    expect(res.body.tasks[0].name).toEqual('Menyapu Halaman')
  })
})

describe('DELETE /api/v1/todos/{todoDate}/tasks/{taskId}', () => {
  let todoDate: string
  let taskId: string

  beforeEach(async () => {
    const date = new Date()
    todoDate = date.toISOString()

    await request(app)
      .post('/api/v1/todos')
      .set('Authorization', 'Bearer ' + token)
      .send({ date: todoDate })

    const todo = await request(app)
      .post(`/api/v1/todos/${todoDate}/tasks`)
      .set('Authorization', 'Bearer ' + token)
      .send({ name: 'Menyapu halaman' })

    taskId = todo.body.tasks[0]._id
  })

  afterEach(async () => {
    await Todo.deleteOne({ createdAt: todoDate })
  })

  test('No Content', async () => {
    const res = await request(app)
      .delete(`/api/v1/todos/${todoDate}/tasks/${taskId}`)
      .set('Authorization', 'Bearer ' + token)

    expect(res.status).toEqual(204)
  })
})