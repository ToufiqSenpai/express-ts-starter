import {model, Schema} from "mongoose";

const todoSchema = new Schema({
    tasks: [new Schema({
        name: String,
        status: {
            enums: ['FINISHED', 'UNFINISHED']
        }
    }, { timestamps: true })],
    createdAt: Date
})

const Todo = model('Todo', todoSchema)

export default Todo