import { Validator } from "flare-validator";
import SignupRequest from "../types/request/SignupRequest";
import User from "../models/User";
import * as bcrypt from 'bcrypt'
import validator from "../utils/validator";

namespace AuthService {
  export async function signup(data: SignupRequest) {
    const validation = await validator(data, {
      name: 'required|min_length:1|max_length:99',
      email: 'required|min_length:1|max_length:99|email|unique:User,email',
      password: 'required|min_length:1|max_length:99'
    }, {}, {
      name: 'Name',
      email: 'Email',
      password: 'Password'
    })
    validation.throwIfFailed()

    console.log(validation.violation.getMessageList())

    data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync())

    const user = new User(data)
    user.save()
  }
}

export default AuthService