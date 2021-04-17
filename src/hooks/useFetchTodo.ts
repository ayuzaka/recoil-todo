import { useCallback } from 'react'
import { useFetch } from './useFetch'

export const useFetchTodo = () => {
  const customFetch = useFetch()

  const addTodo = useCallback(async (todoItem: Todo.TodoItemType) => {
    const res = await customFetch<Todo.TodoItemType, { status: string }>('todo/add', 'POST', todoItem)

    return res
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { customFetch, addTodo }
}
