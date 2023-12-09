import Todo, {ITodo} from "../models/Todo";
import HttpException from "../exceptions/HttpException";
import HttpStatus from "../enums/HttpStatus";
import validator from "../utils/validator";
import {RuleValidator} from "flare-validator";
import ISODate from "../rules/ISODate";

namespace TodoService {
  export async function getTodos(): Promise<ITodo[]> {
    return Todo.find()
  }

  export async function save(date: string) {
    const validation = await validator({ date }, {
      date: ['required', 'min_length:1', 'max_length:99', new ISODate()]
    })
    validation.throwIfFailed()

    const todo = new Todo({ createdAt: date })
    await todo.save()

    return todo
  }

  export async function renameTask(todo: ITodo, name: string) {
    // await validateName(name)
    // todo.tasks.find(task => task._id) ==
  }
}

export default TodoService