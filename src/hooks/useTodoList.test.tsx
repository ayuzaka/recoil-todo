import React, { VFC, ReactNode } from 'react'
import { snapshot_UNSTABLE, RecoilRoot } from 'recoil'
import { renderHook, act, RenderResult } from '@testing-library/react-hooks'
import { todoListState, useTodoList } from './useTodoList'

describe('defaultState', () => {
  test('default todoList state', () => {
    const snapshot = snapshot_UNSTABLE()
    expect(snapshot.getLoadable(todoListState).valueOrThrow()).toEqual([])
  })
})

const RecoilWrapper: VFC<{ children: ReactNode }> = ({ children }) => <RecoilRoot>{children}</RecoilRoot>

describe('action', () => {
  let renderHookResult: RenderResult<ReturnType<typeof useTodoList>>

  beforeEach(() => {
    renderHookResult = renderHook(() => useTodoList(), { wrapper: RecoilWrapper }).result
  })

  describe('ADD', () => {
    test('addItem', () => {
      act(() => {
        renderHookResult.current.addItem('add test')
      })

      expect(renderHookResult.current.todoList).toEqual([{ id: expect.any(String), text: 'add test', isComplete: false }])
    })
  })

  describe('UPDATE', () => {
    beforeEach(() => {
      act(() => {
        renderHookResult.current.addItem('add test')
      })
    })

    test('editItemText', () => {
      act(() => {
        renderHookResult.current.editItemText(renderHookResult.current.todoList[0], 'edit test')
      })

      expect(renderHookResult.current.todoList).toEqual([{ id: expect.any(String), text: 'edit test', isComplete: false }])
    })

    test('toggleItemCompletion', () => {
      act(() => {
        renderHookResult.current.toggleItemCompletion(renderHookResult.current.todoList[0])
      })

      expect(renderHookResult.current.todoList).toEqual([{ id: expect.any(String), text: 'add test', isComplete: true }])
    })

    test('deleteItem', () => {
      act(() => {
        renderHookResult.current.deleteItem(renderHookResult.current.todoList[0].id)
      })

      expect(renderHookResult.current.todoList).toEqual([])
    })
  })
})
