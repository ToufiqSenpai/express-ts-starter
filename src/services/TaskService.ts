import {ITodo} from "../models/Todo";
import validator from "../utils/validator";

namespace TaskService {
  function getTaskIndex(todo: ITodo, id: string) {
    return todo.tasks.findIndex(t => t._id.toString() == id)
  }

  export async function save(todo: ITodo, name: string) {
    await validateName(name)

    todo.tasks.push({ name, status: 'UNFINISHED' })
    await todo.save()

    return todo
  }

  export async function rename(todo: ITodo, id: string, name: string) {
    await validateName(name)

    const index = todo.tasks.findIndex(t => t._id.toString() == id)
    todo.tasks[index].name = name

    await todo.save()

    return todo
  }

  export async function setStatus(todo: ITodo, id: string, status: 'UNFINISHED' | 'FINISHED') {
    const index = getTaskIndex(todo, id)
    todo.tasks[index].status = status

    await todo.save()

    return todo
  }

  async function validateName(name: string) {
    const validation = await validator({ name }, {
      name: 'required|min_length:1|max_length:99'
    })
    validation.throwIfFailed()
  }
}

export default TaskService