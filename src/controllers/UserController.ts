import {Request, Response} from "express";
import User from "../models/User";

namespace UserController {
  export async function getMe(req: Request, res: Response) {
    return res.status(200).json(await User.findById(req.token.id))
  }
}

export default UserController