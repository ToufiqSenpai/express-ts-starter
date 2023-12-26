import {NextFunction, Request, Response} from "express"
import * as jwt from 'jsonwebtoken'
import HttpStatus from "../enums/HttpStatus"
import responseStatus from "../utils/responseStatus";
import env from 'dotenv'
import User, { IUser } from "../models/User";

env.config()

declare global {
  namespace Express {
    interface Request {
      /**
       * Parsed JWT token from Auth Bearer
       */
      user?: IUser
    }
  }
}

async function autheticateUser(req: Request, res: Response, next: NextFunction) {
  const bearerToken = req.headers.authorization

  try {
    if(bearerToken) {
      const [tokenType, token] = bearerToken.split(' ')
      if(!tokenType && tokenType != 'Bearer') throw new Error('Invalid token type.')

      const parsedToken = jwt.verify(token, process.env.TOKEN_SECRET || '') as any
      const user = await User.findById(parsedToken.id)
      if(!user) throw new Error('User not found.')

      req.user = user
      next()
    } else {
      throw new Error('Unauthorized.')
    }
  } catch (error) {
    return res.status(401).json(responseStatus(HttpStatus.UNAUTHORIZED))
  }
}

export default autheticateUser