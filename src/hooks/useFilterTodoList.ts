import { useCallback } from 'react'
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil'
import { todoListState } from './useTodoList'

export type FilterType = 'Show All' | 'Show Completed' | 'Show Uncompleted'

const todoListFilterState = atom<FilterType>({
  key: 'todoListFilterState',
  default: 'Show All',
})

const filteredTodoListState = selector({
  key: 'filteredTodoListState',
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

  const updateFilter = useCallback((filterType: FilterType) => {
    setFilter(filterType)
  }, [])

  return { filteredTodoList, filter, updateFilter }
}
