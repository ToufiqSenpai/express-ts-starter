import { NextFunction, Request, Response } from "express";
import AuthService from "../services/AuthService";
import responseStatus from "../utils/responseStatus";
import HttpStatus from "../enums/HttpStatus";

namespace AuthController {
  export async function signup(req: Request, res: Response, next: NextFunction) {
    try {
      AuthService.signup(req.body)
      return res.status(201).json(responseStatus(HttpStatus.CREATED))
    } catch (error) {
      return next(error)
    }
  }
}

export default AuthController