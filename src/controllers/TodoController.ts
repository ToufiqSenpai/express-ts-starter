import {NextFunction, Request, Response} from "express";
import validator from "../utils/validator";
import ISODate from "../rules/ISODate";
import Todo from "../models/Todo";
import PostTodoRequest from "../types/request/PostTodoRequest";
import HttpException from "../exceptions/HttpException";
import HttpStatus from "../enums/HttpStatus";

namespace TodoController {
  export async function postTodo(req: Request, res: Response, next: NextFunction) {
    const { date }: PostTodoRequest = req.body
    const { violation } = await validator({ date }, {
      date: ['required', 'min_length:1', 'max_length:99', new ISODate()]
    })

    if(!violation.isValid()) {
      return next(new HttpException(HttpStatus.BAD_REQUEST, null, violation.getMessageList()))
    }

    const todo = new Todo({ createdAt: date })
    await todo.save()

    return res.status(201).json(todo)
  }

  export async function getTodoByISO(req: Request, res: Response) {
    return res.status(200).json(req.todo)
  }

  export async function postTask(req: Request, res: Response, next: NextFunction) {
    const { name }: { name: string } = req.body
    const violation = await validateName(name)

    if(!violation.isValid()) {
      return next(new HttpException(HttpStatus.BAD_REQUEST, null, violation.getMessageList()))
    }

    const todo = req.todo
    todo.tasks.push({ status: "UNFINISHED", name })

    await todo.save()

    return res.status(201).json(todo)
  }

  async function patchSetTaskName(req: Request, res: Response, next: NextFunction) {

  }

  async function validateName(name: string) {
    const validation = await validator({ name }, {
      name: 'required|min_length:1|max_length:99'
    })
    return validation.violation
  }
}

export default TodoController