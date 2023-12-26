import {Request, Response} from "express";
import User from "../models/User";
import fs from 'fs'
import crypto from 'crypto'
import HttpStatus from "../enums/HttpStatus";

namespace UserController {
  export async function getMe(req: Request, res: Response) {
    return res.status(200).json(req.user)
  }

  export async function putProfilePicture(req: Request, res: Response) {
    const file: Buffer = req.body
    const fileName = `${crypto.randomUUID()}.${req.headers["content-type"].split('/').pop()}`
    const user = req.user
    
    fs.writeFileSync(`public/profile-image/${fileName}`, file)

    user.profilePicture = fileName
    await user.save()

    res.status(HttpStatus.CREATED).json(user)
  }
}

export default UserController