import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'
import { v4 as uuidv4 } from 'uuid'
import { removeItemAtIndex, replaceItemAtIndex } from '../utils/ArrayUtil'

export type TodoItemType = {
  id: string
  text: string
  isComplete: boolean
}

export const todoListState = atom<TodoItemType[]>({
  key: 'todoListState',
  default: [],
})

export const useTodoList = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState)

  const addItem = useCallback((inputValue: string) => {
    setTodoList((currentTodoList) => [
      ...currentTodoList,
      {
        id: uuidv4(),
        text: inputValue,
        isComplete: false,
      },
    ])
  }, [])

  const editItemText = useCallback(
    (item: TodoItemType, value: string) => {
      const newTodoList = replaceItemAtIndex(todoList, item.id, {
        ...item,
        text: value,
      })

      setTodoList(newTodoList)
    },
    [todoList]
  )

  const toggleItemCompletion = useCallback(
    (item: TodoItemType) => {
      const newTodoList = replaceItemAtIndex(todoList, item.id, {
        ...item,
        isComplete: !item.isComplete,
      })
      setTodoList(newTodoList)
    },
    [todoList]
  )

  const deleteItem = useCallback(
    (id: string) => {
      const newTodoList = removeItemAtIndex(todoList, id)
      setTodoList(newTodoList)
    },
    [todoList]
  )

  return { todoList, addItem, editItemText, toggleItemCompletion, deleteItem }
}
