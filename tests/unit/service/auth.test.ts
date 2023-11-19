import { ValidationException } from 'flare-validator'
import AuthService from '../../../src/services/auth-service'
import User from '../../../src/models/User'

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