import { ValidationException } from 'flare-validator'
import AuthService from '../../../src/services/AuthService'
import User from '../../../src/models/User'
import * as bcrypt from 'bcrypt'
import HttpException from "../../../src/exceptions/HttpException";

describe('test signup function', () => {
  User.prototype.save = jest.fn()
  User.findOne = jest.fn()

  test('save data failed', () => {
    expect(async () => await AuthService.signup({ name: '', email: '', password: '' })).rejects.toThrow(ValidationException)
  })

  test('save data success', () => {
    expect(async () => await AuthService.signup({ name: 'John Doe', email: 'john@example.com', password: 'john_'}))
      .not.toThrow(ValidationException)
  })
})

describe('test login function', () => {
  const password = 'john_'
  let hashedPassword: string
  User.findOne = jest.fn().mockReturnValue({ comparePassword: jest.fn(() => true) })

  beforeEach(() => {
    hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync())
  })

  test('success authentication', async () => {
    const token = await AuthService.login({ email: 'John Doe', password: 'john_' })
    expect(token).toBeDefined()
  })

  test('failed authentication', () => {
    expect(async () => await AuthService.login({ email: 'John Doe', password: 'doe_' })).toThrow(HttpException)
  })
})