import { RecoilRoot } from 'recoil'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { TodoListFilters } from './TodoListFilters'

describe('初期状態', () => {
  test('render', () => {
    const { asFragment } = render(
      <RecoilRoot>
        <TodoListFilters />
      </RecoilRoot>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('フィルターの種類の初期値は「Show All」となっていること', () => {
    render(
      <RecoilRoot>
        <TodoListFilters />
      </RecoilRoot>
    )
    expect(screen.getByRole('combobox')).toHaveValue('Show All')

  })
})

describe('イベント', () => {
  beforeEach(() => {
    render(
      <RecoilRoot>
        <TodoListFilters />
      </RecoilRoot>
    )
  })

  test('フィルターの選択肢を変更できること', () => {
    const combobox = screen.getByRole('combobox')
    userEvent.selectOptions(combobox, 'Show Completed')
    expect(combobox).toHaveValue('Show Completed')
  })

  test.todo('フィルターの選択肢が変更されたとき、更新のイベントが発生すること')
})
