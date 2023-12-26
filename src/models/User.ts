import { ObjectId, Schema, model, Document } from "mongoose"
import * as bcrypt from 'bcrypt'

export interface IUser extends Document {
  _id: ObjectId
  name: string
  email: string
  password: string
  profilePicture: string
  comparePassword(password: string): boolean
}

const userSchema = new Schema<IUser>({
  name: String,
  email: String,
  password: String,
  profilePicture: String
}, {
  timestamps: true,
  methods: {
    /**
     * @param password to compare
     */
    comparePassword(password: string): boolean {
      return bcrypt.compareSync(password, this.password || '')
    }
  }
})

const User = model('User', userSchema)

export default User