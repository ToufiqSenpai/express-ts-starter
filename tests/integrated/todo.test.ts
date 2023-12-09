import database from "../../src/utils/database";
import {disconnect} from "mongoose";
import getToken from "../utils/getToken";
import Todo from "../../src/models/Todo";
import request from "supertest";
import app from "../../src/main";
import todo from "../../src/models/Todo";

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

  it('should response Bad Request if date prop is undefined', async () => {
    const res = await request(app)
      .post('/api/v1/todos')
      .set('Authorization', 'Bearer ' + token)
      .send({ })

    expect(res.status).toEqual(400)
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
    await Todo.deleteOne({ createdAt: todoDate })
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