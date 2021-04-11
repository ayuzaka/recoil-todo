import { RecoilRoot } from 'recoil'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { TodoItemCreator } from './TodoItemCreator'

describe('初期状態', () => {
  test('render', () => {
    const { asFragment } = render(
      <RecoilRoot>
        <TodoItemCreator />
      </RecoilRoot>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('テキストボックスには何も入力されていないこと', () => {
    render(
      <RecoilRoot>
        <TodoItemCreator />
      </RecoilRoot>
    )
    expect(screen.getByRole('textbox')).toHaveValue('')
  })
})

describe('イベント', () => {
  beforeEach(() => {
    render(
      <RecoilRoot>
        <TodoItemCreator />
      </RecoilRoot>
    )
  })

  test('テキストボックスに入力できる', () => {
    userEvent.type(screen.getByRole('textbox'), 'Hello')
    expect(screen.getByRole('textbox')).toHaveValue('Hello')
  })

  test('ボタンを押したとき、テキストボックスの値がリセットされること', () => {
    const textbox = screen.getByRole('textbox')
    userEvent.type(textbox, 'Hello')
    expect(textbox).toHaveValue('Hello')
    userEvent.click(screen.getByRole('button'))
    expect(textbox).toHaveValue('')
  })

  test.todo('ボタンを押したとき、アイテムを追加する関数が実行されること')
})
