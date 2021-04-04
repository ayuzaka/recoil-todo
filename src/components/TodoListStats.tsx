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
    <li>Total Item: {totalNum}</li>
    <li>Items completed: {totalCompletedNum}</li>
    <li>Items not completed: {totalUncompletedNum}</li>
    <li>Percent completed: {formattedPercentCompleted}</li>
  </ul>
)

const Container: VFC = () => {
  const { totalNum, totalCompletedNum, totalUncompletedNum, percentCompleted } = useStatsTodoList()
  const formattedPercentCompleted = Math.round(percentCompleted)

  return <Component {...{ totalNum, totalCompletedNum, totalUncompletedNum, formattedPercentCompleted }} />
}

export const TodoListStats = Container
