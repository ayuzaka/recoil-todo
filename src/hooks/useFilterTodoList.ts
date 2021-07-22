import { useCallback } from 'react'
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil'
import { todoListState } from './useTodoList'
import { RecoilAtomKeys, RecoilSelectorKeys } from '../storeKey'

export const todoListFilterState = atom<Todo.FilterType>({
  key: RecoilAtomKeys.todoListFilterState,
  default: 'Show All',
})

export const filteredTodoListState = selector({
  key: RecoilSelectorKeys.filteredTodoListState,
  get: ({ get }) => {
    const filter = get(todoListFilterState)
    const list = get(todoListState)

    switch (filter) {
      case 'Show Completed':
        return list.filter((item) => item.isComplete)

      case 'Show Uncompleted':
        return list.filter((item) => !item.isComplete)

      default:
        return list
    }
  },
})

export const useFilterTodoList = () => {
  const filteredTodoList = useRecoilValue(filteredTodoListState)
  const [filter, setFilter] = useRecoilState(todoListFilterState)

  const updateFilter = useCallback(
    (filterType: Todo.FilterType) => {
      setFilter(filterType)
    },
    [setFilter]
  )

  return { filteredTodoList, filter, updateFilter }
}
