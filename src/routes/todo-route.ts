import {Router} from "express";
import Todo from "../models/Todo";
import responseStatus from "../utils/responseStatus";
import HttpStatus from "../enums/HttpStatus";

declare global {
  namespace Express {
    interface Request {
      // @ts-ignore
      todo?: Todo
    }
  }
}

const todoRoute = Router()

todoRoute.use('/:todoId', async (req, res, next) => {
  const todoId = req.params.todoId

  const todo = await Todo.findById(todoId)
  if(!todo) return res.status(404).json(responseStatus(HttpStatus.NOT_FOUND, 'Todo not found.'))

  req.todo = todo
  next()
})

export default todoRoute