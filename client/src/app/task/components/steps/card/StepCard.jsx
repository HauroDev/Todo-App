import CrossButton from '../../../../../components/buttons/CrossButton'
import useTaskDetail from '../../../hooks/useTaskDetail'
import StepDescription from './StepDescription'
import StepStatus from './StepStatus'

const StepCard = ({ index, handleStepRemove }) => {
  const { handleSubmit } = useTaskDetail()

  return (
    <article className='flex flex-row gap-1 items-center rounded-lg bg-gray-900 p-2'>
      <StepStatus {...{ index }} />
      <StepDescription {...{ index, handleStepRemove }} />
      <CrossButton
        onClick={() => {
          handleStepRemove(index)
          handleSubmit()
        }}
      />
    </article>
  )
}

export default StepCard
