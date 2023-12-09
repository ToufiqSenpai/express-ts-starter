import { Router } from "express";
import Todo, { ITodo } from "../models/Todo";
import responseStatus from "../utils/responseStatus";
import HttpStatus from "../enums/HttpStatus";
import TodoController from "../controllers/TodoController";

declare global {
  namespace Express {
    interface Request {
      // @ts-ignore
      todo?: ITodo
    }
  }
}

const todoRoute = Router()

todoRoute.use('/:todoDate', async (req, res, next) => {
  const todoDate = req.params.todoDate as string

  const todo = await Todo.findOne({ createdAt: todoDate })

  if(!todo) return res.status(404).json(responseStatus(HttpStatus.NOT_FOUND, 'Todo not found.'))

  req.todo = todo
  next()
})

// todoRoute.use('/:todoDate/tasks/:taskId', async (req, res, next) => {
//   const taskId = req.params.taskId
//
//   const task = req.todo.tasks
// })

todoRoute.post('/', TodoController.postTodo)

todoRoute.get('/:todoDate', TodoController.getTodoByISO)

todoRoute.post('/:todoDate/tasks', TodoController.postTask)

export default todoRoute