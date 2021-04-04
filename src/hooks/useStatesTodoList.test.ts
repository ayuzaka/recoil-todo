import { snapshot_UNSTABLE, RecoilRoot } from 'recoil'
import { todoListStatsState } from './useStatesTodoList'
import { todoListState, TodoItemType } from './useTodoList'

const testTodoList: TodoItemType[] = [
  { id: 'no1', text: 'uncompleted', isComplete: false },
  { id: 'no2', text: 'completed', isComplete: true },
]

describe('state', () => {
  test('default state', () => {
    const snapshot = snapshot_UNSTABLE()
    expect(snapshot.getLoadable(todoListStatsState).valueOrThrow()).toEqual({
      totalNum: 0,
      totalCompletedNum: 0,
      totalUncompletedNum: 0,
      percentCompleted: 0,
    })
  })

  test('updated state', () => {
    const snapshot = snapshot_UNSTABLE(({ set }) => set(todoListState, testTodoList))
    expect(snapshot.getLoadable(todoListStatsState).valueOrThrow()).toEqual({
      totalNum: 2,
      totalCompletedNum: 1,
      totalUncompletedNum: 1,
      percentCompleted: 50,
    })
  })
})
