import {NextFunction, Request, Response} from "express"
import * as jwt from 'jsonwebtoken'
import HttpStatus from "../enums/HttpStatus"
import responseStatus from "../utils/responseStatus";
import env from 'dotenv'

env.config()

declare global {
  namespace Express {
    interface Request {
      /**
       * Parsed JWT token from Auth Bearer
       */
      token?: { id: number }
    }
  }
}

async function autheticateUser(req: Request, res: Response, next: NextFunction) {
  const bearerToken = req.headers.authorization
  const cookieToken = req.cookies.token

  try {
    let jwtToken: string

    if(bearerToken) {
      const [tokenType, token] = bearerToken.split(' ')

      if(!tokenType && tokenType != 'Bearer') throw new Error('Invalid token type.')
      jwtToken = token
    } else if(cookieToken) {
      jwtToken = cookieToken
    } else {
      throw new Error('Unauthorized.')
    }

    const parsedToken = jwt.verify(jwtToken, process.env.TOKEN_SECRET || '') as any
    req.token = { id: parsedToken.id }

    next()
  } catch (error) {
    return res.status(401).json(responseStatus(HttpStatus.UNAUTHORIZED))
  }
}

export default autheticateUser