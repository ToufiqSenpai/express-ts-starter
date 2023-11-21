import { NextFunction, Request, Response } from "express";
import AuthService from "../services/AuthService";
import responseStatus from "../utils/responseStatus";
import HttpStatus from "../enums/HttpStatus";

namespace AuthController {
  export async function signup(req: Request, res: Response, next: NextFunction) {
    try {
      await AuthService.signup(req.body)
      return res.status(201).json(responseStatus(HttpStatus.CREATED))
    } catch (error) {
      return next(error)
    }
  }

  export async function login(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await AuthService.login(req.body)
      return res.status(HttpStatus.OK).json({ token })
    } catch (error) {
      return next(error)
    }
  }
}

export default AuthController