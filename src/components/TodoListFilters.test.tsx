import { Suspense } from 'react'
import { RecoilRoot } from 'recoil'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { TodoListFilters } from './TodoListFilters'

describe('初期状態', () => {
  test('フィルターの種類の初期値は「Show All」となっていること', async () => {
    render(
      <RecoilRoot>
        <Suspense fallback={<div>Loading</div>}>
          <TodoListFilters />
        </Suspense>
      </RecoilRoot>
    )
    await waitFor(() => expect(screen.getByRole('combobox')).toHaveValue('Show All'))
  })
})

describe('イベント', () => {
  beforeEach(() => {
    render(
      <RecoilRoot>
        <Suspense fallback={<div>Loading</div>}>
          <TodoListFilters />
        </Suspense>
      </RecoilRoot>
    )
  })

  test('フィルターの選択肢を変更できること', async () => {
    await waitFor(() => {
      const combobox = screen.getByRole('combobox')
      userEvent.selectOptions(combobox, 'Show Completed')
      expect(combobox).toHaveValue('Show Completed')
    })
  })

  test.todo('フィルターの選択肢が変更されたとき、更新のイベントが発生すること')
})
