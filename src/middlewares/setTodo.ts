import { NextFunction, Request, Response } from "express"
import Todo, { ITodo } from "../models/Todo"
import responseStatus from "../utils/responseStatus"
import HttpStatus from "../enums/HttpStatus"
import moment from 'moment'

declare global {
  namespace Express {
    interface Request {
      // @ts-ignore
      todo?: ITodo
    }
  }
}

async function setTodo(req: Request, res: Response, next: NextFunction) {
  const date = moment(req.params.todoDate as string)

  const todo = await Todo.findOne({ createdAt: {
    $gte: date.startOf('day').toDate(),
    $lt: date.endOf('day').toDate(),
  }, userId: req.user._id.toString() })

  if(!todo) return res.status(404).json(responseStatus(HttpStatus.NOT_FOUND, 'Todo not found.'))

  req.todo = todo
  next()
}

export default setTodo