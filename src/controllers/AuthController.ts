import {NextFunction, Request, Response} from "express";
import responseStatus from "../utils/responseStatus";
import HttpStatus from "../enums/HttpStatus";
import validator from "../utils/validator";
import * as bcrypt from "bcrypt";
import User from "../models/User";
import SignupRequest from "../types/request/SignupRequest";
import * as jwt from "jsonwebtoken";
import HttpException from "../exceptions/HttpException";
import LoginRequest from "../types/request/LoginRequest";

namespace AuthController {
  export async function signup(req: Request, res: Response, next: NextFunction) {
    const body: SignupRequest = req.body
    const { violation } = await validator(body, {
      name: 'required|min_length:1|max_length:99',
      email: 'required|min_length:1|max_length:99|email|unique:User,email',
      password: 'required|min_length:1|max_length:99'
    }, { email: ':attribute is not valid.', required: 'Required.' }, {
      name: 'Name',
      email: 'Email',
      password: 'Password'
    })

    if(!violation.isValid()) {
      return next(new HttpException(HttpStatus.BAD_REQUEST, null, violation.getMessageList()))
    }

    body.password = bcrypt.hashSync(body.password, bcrypt.genSaltSync())

    const user = new User(body)
    await user.save()

    return res.status(201).json(responseStatus(HttpStatus.CREATED))
  }

  export async function login(req: Request, res: Response, next: NextFunction) {
    const { email, password }: LoginRequest = req.body
    const user = await User.findOne({ email })

    if(user?.comparePassword(password)) {
      const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET)

      return res.status(200).json({ token })
    } else {
      return next(new HttpException(HttpStatus.UNAUTHORIZED))
    }
  }
}

export default AuthController