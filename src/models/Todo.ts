import {model, Schema, Document} from "mongoose";

export interface ITodo extends Document {
    tasks: {
        name: string,
        status: 'FINISHED' | 'UNFINISHED'
    }[]
    createdAt: Date
}

const todoSchema = new Schema<ITodo>({
    tasks: [new Schema({
        name: String,
        status: {
            type: String,
            enums: ['FINISHED', 'UNFINISHED']
        }
    }, { timestamps: true })],
    createdAt: Date
})

const Todo = model('Todo', todoSchema)

export default Todo