import { Request, Response } from "express"
import BodyBuilder from "../utils/BodyBuilder"
import HttpStatus from "../enums/HttpStatus"

namespace HomeController {
  export function get(req: Request, res: Response) {
    return res.status(200).json(new BodyBuilder(HttpStatus.OK, 'Hello World'))
  }
}

export default HomeController