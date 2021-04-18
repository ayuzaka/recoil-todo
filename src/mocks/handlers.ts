import { rest } from 'msw'

const todoList: Todo.TodoItemType[] = [
  { id: '1', text: 'Mock1', isComplete: false },
  { id: '2', text: 'Mock2', isComplete: true },
  { id: '3', text: 'Mock3', isComplete: false },
]

export const handlers = [
  rest.get<undefined>('/todo/list', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todoList))
  }),

  rest.post<Todo.TodoItemType>('/todo/add', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ code: 200, status: 'ok' }))
  })
]
