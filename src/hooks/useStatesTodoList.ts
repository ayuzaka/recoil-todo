import { selector, useRecoilValue } from 'recoil'
import { todoListState } from './useTodoList'
import { RecoilSelectorKeys } from '../storeKey'

export const todoListStatsState = selector({
  key: RecoilSelectorKeys.todoListStatsState,
  get: ({ get }) => {
    const todoList = get(todoListState)
    const totalNum = todoList.length
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length
    const totalUncompletedNum = totalNum - totalCompletedNum
    const percentCompleted = totalNum === 0 ? 0 : (totalCompletedNum / totalNum) * 100

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    }
  },
})

export const useStatsTodoList = () => useRecoilValue(todoListStatsState)
