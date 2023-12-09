import Todo, {ITodo} from "../../../src/models/Todo";
import TodoService from "../../../src/services/TodoService";
import {ValidationException} from "flare-validator";

describe('test save', () => {
  let ISODate: string

  beforeEach(() => {
    ISODate = (new Date()).toISOString()
  })

  test('success creating', async () => {
    const todo = await TodoService.save(ISODate)

    expect(todo.createdAt.toISOString()).toEqual(ISODate)
  })

  test('failed creating', async () => {
    await expect(async () => await TodoService.save(''))
      .rejects.toThrow(ValidationException)
  })
})

describe('test getTodos', () => {
  beforeEach(() => {
    Todo.find = jest.fn().mockReturnValue([{
      createdAt: new Date(),
      tasks: [
        {
          name: 'Menyapu Halaman',
          status: 'FINISHED'
        },
        {
          name: 'Membaca',
          status: 'UNFINISHED'
        }
      ]
    }])
  })

  test('success get todos', async () => {
    const todos = await TodoService.getTodos()

    todos.forEach(todo => {
      expect(todo).toBeDefined()
    })
  })
})