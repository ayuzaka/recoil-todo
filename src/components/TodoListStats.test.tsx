import { Suspense } from 'react'
import { RecoilRoot } from 'recoil'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { TodoListStats } from './TodoListStats'

describe('初期状態', () => {
  test('初期状態はすべてが0であること', async () => {
    render(
      <RecoilRoot>
        <Suspense fallback={<div>Loading</div>}>
          <TodoListStats />
        </Suspense>
      </RecoilRoot>
    )

    await waitFor(() => {
      const totalItem = screen.getByTestId('totalItem')
      expect(totalItem).toHaveTextContent('Total Item: 0')

      const completedItem = screen.getByTestId('completedItem')
      expect(completedItem).toHaveTextContent('Items completed: 0')

      const uncompletedItem = screen.getByTestId('uncompletedItem')
      expect(uncompletedItem).toHaveTextContent('Items not completed: 0')

      const percentCompleted = screen.getByTestId('percentCompleted')
      expect(percentCompleted).toHaveTextContent('Percent completed: 0')
    })
  })

  test.todo('ステートの値が反映されること')
})
