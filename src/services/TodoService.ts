import Todo, {ITodo} from "../models/Todo";
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

    export async function insertTask(todo: ITodo, name: string) {
        todo.tasks.push({ name, status: "UNFINISHED" })
        await todo.save()

        return todo.tasks
    }

    export async function renameTask(todo: ITodo, name: string) {

    }
}

export default TodoService