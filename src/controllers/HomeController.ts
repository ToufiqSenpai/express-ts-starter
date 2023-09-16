import { Request, Response } from "express"
import HttpStatus from "../enums/HttpStatus"
import responseStatus from "../utils/responseStatus"

namespace HomeController {
  export function get(req: Request, res: Response) {
    return res.status(200).json(responseStatus(HttpStatus.OK))
  }
}

export default HomeController