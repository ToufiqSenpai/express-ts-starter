import Todo from "../../../src/models/Todo";
import TodoService from "../../../src/services/TodoService";

Todo.prototype.save = jest.fn()

describe('test insertTodo', () => {
  Todo.findById = jest.fn().mockReturnValue({
    tasks: [],
    async save() {}
  })

  test('success inserting', async () => {
    const tasks = await TodoService.insertTask('7349', 'Menyapu Halaman')

    expect(tasks[0].name).toEqual('Menyapu Halaman')
    expect(tasks[0].status).toEqual('UNFINISHED')
  })
})

describe('test createTodo', () => {
  test('success creating', async () => {
    const ISODate = (new Date()).toISOString()
    const todo = await TodoService.createTodo(ISODate)

    expect(todo.createdAt.toISOString()).toEqual(ISODate)
  })
})