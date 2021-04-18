import { VFC, useState, ChangeEvent } from 'react'
import { useTodoList } from '../hooks/useTodoList'
import { Input } from './Atoms/Input'
import { Button } from './Atoms/Button'

type Props = {
  inputValue: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onClick: () => void
}

const Component: VFC<Props> = ({ inputValue, onChange, onClick }) => (
  <div>
    <Input type="text" value={inputValue} onChange={onChange} />
    <Button onClick={onClick}>Add</Button>
  </div>
)

const Container: VFC = () => {
  const [inputValue, setInputValue] = useState('')
  const { addItem } = useTodoList()

  const onClick = () => {
    addItem(inputValue)
    setInputValue('')
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  return <Component {...{ inputValue, onChange, onClick }} />
}

export const TodoItemCreator = Container
