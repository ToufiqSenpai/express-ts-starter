import request from 'supertest'
import app from '../src/main'

describe("GET /", () => {
  test('status 200', async () => {
    const res = await request(app).get('/')

    expect(res.status).toEqual(200)
    expect(res.body.message).toEqual('Hello World')
  })
})