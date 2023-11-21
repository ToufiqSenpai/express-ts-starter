import { Schema, model } from "mongoose"
import * as bcrypt from 'bcrypt'

const userSchema = new Schema({
  name: String,
  email: String,
  password: String
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