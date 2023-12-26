import { Router } from "express";
import TodoController from "../controllers/TodoController";
import setTodo from "../middlewares/setTodo";

const todoRoute = Router()

todoRoute.use('/:todoDate', setTodo)

todoRoute.post('/', TodoController.postTodo)

todoRoute.get('/:todoDate', TodoController.getTodoByISO)

todoRoute.post('/:todoDate/tasks', TodoController.postTask)

todoRoute.delete('/:todoDate/tasks/:taskId', TodoController.deleteTask)

todoRoute.patch('/:todoDate/tasks/:taskId', TodoController.patchSetTask)

export default todoRoute