import { Validator } from "flare-validator";
import SignupRequest from "../types/request/SignupRequest";
import User from "../models/User";
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import validator from "../utils/validator";
import LoginRequest from "../types/request/LoginRequest";
import HttpException from "../exceptions/HttpException";
import HttpStatus from "../enums/HttpStatus";
import env from 'dotenv'

env.config()

namespace AuthService {
  export async function signup(data: SignupRequest) {
    const validation = await validator(data, {
      name: 'required|min_length:1|max_length:99',
      email: 'required|min_length:1|max_length:99|email|unique:User,email',
      password: 'required|min_length:1|max_length:99'
    }, { email: ':attribute is not valid.' }, {
      name: 'Name',
      email: 'Email',
      password: 'Password'
    })
    validation.throwIfFailed()

    data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync())

    const user = new User(data)
    await user.save()
  }

  export async function login({ email, password }: LoginRequest) {
    const user = await User.findOne({ email })

    if(user?.comparePassword(password)) {
      return jwt.sign({ id: user.id }, process.env.TOKEN_SECRET)
    } else {
      throw new HttpException(HttpStatus.UNAUTHORIZED)
    }
  }
}

export default AuthService