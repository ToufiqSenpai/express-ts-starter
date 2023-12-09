import {Schema, Document} from "mongoose";

export interface ITask extends Document {
  name: string
  status: 'FINISHED' | 'UNFINISHED'
}

export const taskSchema = new Schema<ITask>({
  name: String,
  status: {
    type: String,
    enums: ['FINISHED', 'UNFINISHED']
  }
}, { timestamps: true })