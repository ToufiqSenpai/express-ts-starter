import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";
import BodyBuilder from "../utils/BodyBuilder";
import HttpStatus from "../enums/HttpStatus";

function errorHandling(error: Error, req: Request, res: Response, next: NextFunction): Response {
  if(error instanceof HttpException) {
    return res.status(error.getHttpStatus()).json(
      new BodyBuilder(error.getHttpStatus())
        .addProperty('errors', error.getErrors())
    )
  } else {
    return res.status(500).json(
      new BodyBuilder(HttpStatus.INTERNAL_SERVER_ERROR)
        .addProperty('error', error.name)
        .addProperty('trace', error.stack)
        .addProperty('timestamp', new Date().toISOString())
        .addProperty('path', req.path)
    )
  }
}

export default errorHandling