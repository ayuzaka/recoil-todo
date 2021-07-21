import { useCallback } from 'react'
import { atom, selector, useRecoilState } from 'recoil'
import { v4 as uuidv4 } from 'uuid'
import { removeItemAtIndex, replaceItemAtIndex } from '../utils/ArrayUtil'
import { customFetchJSON } from '../utils/Fetch'
import { useFetchTodo } from './useFetchTodo'

export const todoListState = atom<Todo.TodoItemType[]>({
  key: 'todoListState',
  default: selector({
    key: 'todoListState/default',
    get: async () => {
      const res = await customFetchJSON<unknown, Todo.TodoItemType[]>('todo/list', 'GET')
      if (res.type === 'failure') {
        return []
      }

      return res.value
    },
  }),
})

export const useTodoList = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState)
  const { addTodo } = useFetchTodo()

  const addItem = useCallback(
    async (inputValue: string) => {
      const newTodoItem = {
        id: uuidv4(),
        text: inputValue,
        isComplete: false,
      }
      setTodoList((currentTodoList) => [...currentTodoList, newTodoItem])
      await addTodo(newTodoItem)
    },
    [addTodo, setTodoList]
  )

  const editItemText = useCallback(
    (item: Todo.TodoItemType, value: string) => {
      const newTodoList = replaceItemAtIndex(todoList, item.id, {
        ...item,
        text: value,
      })

      setTodoList(newTodoList)
    },
    [todoList, setTodoList]
  )

  const toggleItemCompletion = useCallback(
    (item: Todo.TodoItemType) => {
      const newTodoList = replaceItemAtIndex(todoList, item.id, {
        ...item,
        isComplete: !item.isComplete,
      })
      setTodoList(newTodoList)
    },
    [todoList, setTodoList]
  )

  const deleteItem = useCallback(
    (id: string) => {
      const newTodoList = removeItemAtIndex(todoList, id)
      setTodoList(newTodoList)
    },
    [todoList, setTodoList]
  )

  return { todoList, addItem, editItemText, toggleItemCompletion, deleteItem }
}
