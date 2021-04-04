import { ChangeEvent, VFC } from 'react'
import { useTodoList, TodoItemType } from '../hooks/useTodoList'

type Props = {
  item: TodoItemType
  onChangeInput: (event: ChangeEvent<HTMLInputElement>) => void
  onChangeCheck: () => void
  onClickDelete: () => void
}

type ContainerProps = {
  item: TodoItemType
}

const Component: VFC<Props> = ({ item, onChangeInput, onChangeCheck, onClickDelete }) => (
  <div>
    <input type="text" value={item.text} onChange={onChangeInput} />
    <input type="checkbox" checked={item.isComplete} onChange={onChangeCheck} />
    <button type="button" onClick={onClickDelete}>
      X
    </button>
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
