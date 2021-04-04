import { VFC } from 'react'
import { RecoilRoot } from 'recoil'
import { TodoList } from './components/TodoList'

const Component: VFC = () => (
  <RecoilRoot>
    <TodoList />
  </RecoilRoot>
)

export const App = Component
