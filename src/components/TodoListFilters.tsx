import { ChangeEvent, VFC } from 'react'
import { useFilterTodoList, FilterType } from '../hooks/useFilterTodoList'

type Props = {
  filter: FilterType
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

const Component: VFC<Props> = ({ filter, onChange }) => (
  <>
    Filter:
    <select value={filter} onChange={onChange}>
      <option value="Show All">All</option>
      <option value="Show Completed">Completed</option>
      <option value="Show Uncompleted">Uncompleted</option>
    </select>
  </>
)

const Container: VFC = () => {
  const { filter, updateFilter } = useFilterTodoList()

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    updateFilter(event.target.value as FilterType)
  }

  return <Component {...{ filter, onChange }} />
}

export const TodoListFilters = Container
