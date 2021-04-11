import { VFC } from 'react'
import { useStatsTodoList } from '../hooks/useStatesTodoList'

type Props = {
  totalNum: number
  totalCompletedNum: number
  totalUncompletedNum: number
  formattedPercentCompleted: number
}

const Component: VFC<Props> = ({ totalNum, totalCompletedNum, totalUncompletedNum, formattedPercentCompleted }) => (
  <ul>
    <li data-testid="totalItem">Total Item: {totalNum}</li>
    <li data-testid="completedItem">Items completed: {totalCompletedNum}</li>
    <li data-testid="uncompletedItem">Items not completed: {totalUncompletedNum}</li>
    <li data-testid="percentCompleted">Percent completed: {formattedPercentCompleted}</li>
  </ul>
)

const Container: VFC = () => {
  const { totalNum, totalCompletedNum, totalUncompletedNum, percentCompleted } = useStatsTodoList()
  const formattedPercentCompleted = Math.round(percentCompleted)

  return <Component {...{ totalNum, totalCompletedNum, totalUncompletedNum, formattedPercentCompleted }} />
}

export const TodoListStats = Container
