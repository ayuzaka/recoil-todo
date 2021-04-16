import { ChangeEvent, VFC } from 'react'
import { useTodoList  } from '../hooks/useTodoList'
import { TransparentButton } from './Atoms/Button'

type Props = {
  item: Todo.TodoItemType
  onChangeInput: (event: ChangeEvent<HTMLInputElement>) => void
  onChangeCheck: () => void
  onClickDelete: () => void
}

type ContainerProps = {
  item: Todo.TodoItemType
}

const Component: VFC<Props> = ({ item, onChangeInput, onChangeCheck, onClickDelete }) => (
  <div>
    <input type="text" value={item.text} onChange={onChangeInput} />
    <input type="checkbox" checked={item.isComplete} onChange={onChangeCheck} />
    <TransparentButton onClick={onClickDelete}>
      X
    </TransparentButton>
  </div>
)

const Container: VFC<ContainerProps> = ({ item }) => {
  const { editItemText, toggleItemCompletion, deleteItem } = useTodoList()

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    editItemText(item, event.target.value)
  }

  const onChangeCheck = () => {
    toggleItemCompletion(item)
  }

  const onClickDelete = () => {
    deleteItem(item.id)
  }

  return <Component {...{ item, onChangeInput, onChangeCheck, onClickDelete }} />
}

export const TodoItem = Container
