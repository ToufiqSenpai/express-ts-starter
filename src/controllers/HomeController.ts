import { Request, Response } from "express"
import HttpStatus from "../enums/HttpStatus"

namespace HomeController {
  export function get(req: Request, res: Response) {
    return res.status(200).json({ message: 'Ok' })
  }
}

export default HomeController