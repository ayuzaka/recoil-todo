import { VFC } from 'react'
import { FlexBox } from './Layout/FlexBox'
import { TodoItemCreator } from './TodoItemCreator'
import { TodoItem } from './TodoItem'
import { TodoListFilters } from './TodoListFilters'
import { TodoListStats } from './TodoListStats'
import { useFilterTodoList } from '../hooks/useFilterTodoList'

type Props = {
  todoList: Todo.TodoItemType[]
}

const Component: VFC<Props> = ({ todoList }) => (
  <>
    <TodoListStats />
    <TodoItemCreator />
    <TodoListFilters />
    <FlexBox direction="column" gap={1}>
      {todoList.map((item) => (
        <TodoItem key={item.id} item={item} />
      ))}
    </FlexBox>
  </>
)

const Container: VFC = () => {
  const { filteredTodoList } = useFilterTodoList()

  return <Component todoList={filteredTodoList} />
}

export const TodoList = Container
