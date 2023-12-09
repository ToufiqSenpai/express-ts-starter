import database from "../../src/utils/database"
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import User from "../../src/models/User";

async function getToken(): Promise<string> {
  let user = await User.findOne({ email: 'test@gmail.com' })

  if(!user) {
    user = await User.create({
      name: 'test',
      email: 'test@gmail.com',
      password: bcrypt.hashSync('test', bcrypt.genSaltSync())
    })
  }

  return jwt.sign({ id: user.id }, process.env.TOKEN_SECRET || '')
}

export default getToken