import Todo, {ITodo} from "../../../src/models/Todo";
import {ValidationException} from "flare-validator";
import TaskService from "../../../src/services/TaskService";
import crypto from "crypto";

Todo.prototype.save = jest.fn()

let todo: ITodo

beforeEach(() => {
  todo = new Todo({
    createdAt: new Date(),
    tasks: [{
      name: 'Menyapu Halaman',
      status: 'UNFINISHED'
    }]
  })
})

describe('test save', () => {
  test('success saving', async () => {
    const tasks = await TaskService.save(todo, 'Menyapu Halaman')

    expect(tasks[0].status).toEqual('UNFINISHED')
    expect(tasks[0].name).toEqual('Menyapu Halaman')
  })

  test('failed saving', async () => {
    await expect(async () => await TaskService.save(todo, ''))
      .rejects.toThrow(ValidationException)
  })
})

describe('test rename', () => {
  test('success rename', async () => {
    const result = await TaskService.rename(todo, todo.tasks[0]._id, 'Membenarkan atap')
    expect(result.tasks[0].name).toEqual('Membenarkan atap')
  })

  test('failed rename', async () => {
    await expect(async () => await TaskService.rename(todo, todo.tasks[0]._id, '' ))
      .rejects.toThrow(ValidationException)
  })
})

describe('test setStatus',  () => {
  test('success setStatus', async () => {
    const result = await TaskService.setStatus(todo, todo[0]._id, 'FINISHED')
    expect(result.tasks[0].status).toEqual('FINISHED')
  })
})