import {NextFunction, Request, Response} from "express";
import validator from "../utils/validator";
import ISODate from "../rules/ISODate";
import Todo from "../models/Todo";
import PostTodoRequest from "../types/request/PostTodoRequest";
import HttpException from "../exceptions/HttpException";
import HttpStatus from "../enums/HttpStatus";
import TodoUnique from "../rules/TodoUnique";
import responseStatus from "../utils/responseStatus";
import PatchSetTask from "../types/request/PatchSetTask";

namespace TodoController {
  export async function postTodo(req: Request, res: Response, next: NextFunction) {
    const { date }: PostTodoRequest = req.body
    const { violation } = await validator({ date }, {
      date: ['required', 'min_length:1', 'max_length:99', new ISODate(), new TodoUnique(req.user._id.toString())]
    })

    if(!violation.isValid()) {
      return next(new HttpException(HttpStatus.BAD_REQUEST, null, violation.getMessageList()))
    }

    const todo = new Todo({ createdAt: date, userId: req.user._id.toString() })
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
    todo.tasks.push({ isFinished: false, name })

    await todo.save()

    return res.status(201).json(todo)
  }

  export async function deleteTask(req: Request, res: Response) {
    const todo = req.todo;
    (todo.tasks as any).id(req.params.taskId).deleteOne()

    todo.save()

    return res.status(204).json(responseStatus(HttpStatus.NO_CONTENT))
  }

  export async function patchSetTask(req: Request, res: Response, next: NextFunction) {
    const body: PatchSetTask = req.body
    const todo = req.todo;
    const task = (todo.tasks as any).id(req.params.taskId)

    if(body.name != undefined) {
      const violation = await validateName(body.name)

      if(!violation.isValid()) {
        return next(new HttpException(HttpStatus.BAD_REQUEST, null, violation.getMessageList()))
      }

      task.name = body.name
    }

    if(body.isFinished != undefined) task.isFinished = body.isFinished
    
    await todo.save()

    return res.status(200).json(todo)
  }

  async function validateName(name: string) {
    const validation = await validator({ name }, {
      name: 'required|min_length:1|max_length:99'
    })
    return validation.violation
  }
}

export default TodoController