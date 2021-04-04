import { VFC } from 'react'
import { TodoItemType } from '../hooks/useTodoList'
import { useFilterTodoList } from '../hooks/useFilterTodoList'
import { TodoItemCreator } from './TodoItemCreator'
import { TodoItem } from './TodoItem'
import { TodoListFilters } from './TodoListFilters'
import { TodoListStats } from './TodoListStats'

type Props = {
  todoList: TodoItemType[]
}

const Component: VFC<Props> = ({ todoList }) => (
  <>
    <TodoListStats />
    <TodoItemCreator />
    <TodoListFilters />
    {todoList.map((item) => (
      <TodoItem key={item.id} item={item} />
    ))}
  </>
)

const Container: VFC = () => {
  const { filteredTodoList } = useFilterTodoList()

  return <Component todoList={filteredTodoList} />
}

export const TodoList = Container
