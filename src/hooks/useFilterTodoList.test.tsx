import React, { VFC, ReactNode } from 'react'
// eslint-disable-next-line camelcase
import { snapshot_UNSTABLE, RecoilRoot } from 'recoil'
import { renderHook, act, RenderResult } from '@testing-library/react-hooks'
import { todoListFilterState, filteredTodoListState, useFilterTodoList } from './useFilterTodoList'
import { todoListState  } from './useTodoList'

const testTodoList: Todo.TodoItemType[] = [
  { id: 'no1', text: 'uncompleted', isComplete: false },
  { id: 'no2', text: 'completed', isComplete: true },
]

describe('state', () => {
  test('atom state', () => {
    const initialSnapshot = snapshot_UNSTABLE()
    expect(initialSnapshot.getLoadable(todoListFilterState).valueOrThrow()).toBe('Show All')

    const testSnapshot = snapshot_UNSTABLE(({ set }) => set(todoListFilterState, 'Show Completed'))
    expect(testSnapshot.getLoadable(todoListFilterState).valueOrThrow()).toBe('Show Completed')
  })

  test('default filter', () => {
    const initialSnapshot = snapshot_UNSTABLE()
    expect(initialSnapshot.getLoadable(filteredTodoListState).valueOrThrow()).toEqual([])
  })

  test('completed filter', () => {
    const snapshot = snapshot_UNSTABLE(({ set }) => {
      set(todoListState, testTodoList)
      set(todoListFilterState, 'Show Completed')
    })
    expect(snapshot.getLoadable(filteredTodoListState).valueOrThrow()).toEqual([
      { id: 'no2', text: 'completed', isComplete: true },
    ])
  })

  test('uncompleted filter', () => {
    const snapshot = snapshot_UNSTABLE(({ set }) => {
      set(todoListState, testTodoList)
      set(todoListFilterState, 'Show Uncompleted')
    })
    expect(snapshot.getLoadable(filteredTodoListState).valueOrThrow()).toEqual([
      { id: 'no1', text: 'uncompleted', isComplete: false },
    ])
  })

  test('all filter', () => {
    const snapshot = snapshot_UNSTABLE(({ set }) => {
      set(todoListState, testTodoList)
      set(todoListFilterState, 'Show All')
    })
    expect(snapshot.getLoadable(filteredTodoListState).valueOrThrow()).toEqual(testTodoList)
  })
})

const RecoilWrapper: VFC<{ children: ReactNode }> = ({ children }) => <RecoilRoot>{children}</RecoilRoot>

describe('action', () => {
  let renderHookResult: RenderResult<ReturnType<typeof useFilterTodoList>>

  beforeEach(() => {
    renderHookResult = renderHook(() => useFilterTodoList(), { wrapper: RecoilWrapper }).result
  })

  test('updateFilter', () => {
    act(() => {
      renderHookResult.current.updateFilter('Show Completed')
    })

    expect(renderHookResult.current.filter).toBe('Show Completed')

    act(() => {
      renderHookResult.current.updateFilter('Show Uncompleted')
    })
    expect(renderHookResult.current.filter).toBe('Show Uncompleted')
  })
})
