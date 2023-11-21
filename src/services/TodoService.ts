import Todo from "../models/Todo";
import HttpException from "../exceptions/HttpException";
import HttpStatus from "../enums/HttpStatus";

namespace TodoService {
    export async function createTodo(ISODate: string) {
        const isISODate = Boolean(Date.parse(ISODate))

        if(isISODate) {
            const todo = new Todo({ createdAt: ISODate })
            await todo.save()

            return todo
        } else {
            throw new HttpException(HttpStatus.BAD_REQUEST, 'ISO date is not valid.')
        }
    }

    export async function insertTask(todoID: string, name: string) {
        const todo = await Todo.findById(todoID)
        todo.tasks.push({ name, status: 'UNFINISHED' })
        await todo.save()

        return todo.tasks
    }
}

export default TodoService