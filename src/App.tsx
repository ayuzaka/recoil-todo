import { VFC, Suspense } from 'react'
import { RecoilRoot } from 'recoil'
import { TodoList } from './components/TodoList'

const Component: VFC = () => (
  <RecoilRoot>
    <Suspense fallback={<div>Loading...</div>}>
      <TodoList />
    </Suspense>
  </RecoilRoot>
)

export const App = Component
