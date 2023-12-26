import { model, Schema, Document, Model, Types } from "mongoose";

export interface ITask {
  _id?: Types.ObjectId
  name: string
  isFinished: boolean
}

export interface ITodo extends Document {
  tasks: ITask[]
  createdAt: Date
  userId: string
}

// <ITodo, Model<ITodo, {}, { tasks: Types.DocumentArray<ITask> }>>

const todoSchema = new Schema<ITodo>({
  tasks: [new Schema({
    name: String,
    isFinished: Boolean
  }, { timestamps: true })],
  createdAt: Date,
  userId: String
}, { timestamps: true })

const Todo = model('Todo', todoSchema)

export default Todo