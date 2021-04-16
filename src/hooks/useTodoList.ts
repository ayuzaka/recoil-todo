import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'
import { v4 as uuidv4 } from 'uuid'
import { removeItemAtIndex, replaceItemAtIndex } from '../utils/ArrayUtil'

export const todoListState = atom<Todo.TodoItemType[]>({
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const editItemText = useCallback(
    (item: Todo.TodoItemType, value: string) => {
      const newTodoList = replaceItemAtIndex(todoList, item.id, {
        ...item,
        text: value,
      })

      setTodoList(newTodoList)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [todoList]
  )

  const toggleItemCompletion = useCallback(
    (item: Todo.TodoItemType) => {
      const newTodoList = replaceItemAtIndex(todoList, item.id, {
        ...item,
        isComplete: !item.isComplete,
      })
      setTodoList(newTodoList)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [todoList]
  )

  const deleteItem = useCallback(
    (id: string) => {
      const newTodoList = removeItemAtIndex(todoList, id)
      setTodoList(newTodoList)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [todoList]
  )

  return { todoList, addItem, editItemText, toggleItemCompletion, deleteItem }
}
