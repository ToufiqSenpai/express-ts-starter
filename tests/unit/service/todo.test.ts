import Todo from "../../../src/models/Todo";
import TodoService from "../../../src/services/TodoService";

describe('test insertTodo', () => {
  test('success inserting', async () => {
    Todo.prototype.save = jest.fn()

    const todo = new Todo({
      createdAt: new Date()
    })

    const tasks = await TodoService.insertTask(todo, 'Menyapu Halaman')

    expect(tasks[0].status).toEqual('UNFINISHED')
    expect(tasks[0].name).toEqual('Menyapu Halaman')
  })
})

describe('test createTodo', () => {
  test('success creating', async () => {
    const ISODate = (new Date()).toISOString()
    const todo = await TodoService.createTodo(ISODate)

    expect(todo.createdAt.toISOString()).toEqual(ISODate)
  })
})