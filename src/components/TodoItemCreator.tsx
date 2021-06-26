import { VFC, useState, ChangeEvent } from 'react'
import styled from '@emotion/styled'
import { useTodoList } from '../hooks/useTodoList'
import { Input } from './Atoms/Input'
import { Button } from './Atoms/Button'
import { todoItem } from '../types/schema'

type Props = {
  inputValue: string
  error: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onClick: () => void
  className?: string
}

const Component: VFC<Props> = ({ inputValue, error, onChange, onClick, className }) => (
  <div className={className}>
    <Input type="text" value={inputValue} onChange={onChange} name="task" />
    <Button onClick={onClick}>Add</Button>
    <div>{error}</div>
  </div>
)

const StyledComponent = styled(Component)`
  > div {
    height: 24px;
  }
`

const Container: VFC = () => {
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState('')
  const { addItem } = useTodoList()

  const onClick = () => {
    const res = todoItem.shape.text.safeParse(inputValue)
    if (res.success) {
      addItem(inputValue)
      setInputValue('')

      return
    }

    setError(res.error.errors[0].message)
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  return <StyledComponent {...{ inputValue, error, onChange, onClick }} />
}

export const TodoItemCreator = Container
