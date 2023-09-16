import { Controller } from 'react-hook-form'
import { useTaskSelector } from '../../../../../hooks/store'
import useTaskDetail from '../../../hooks/useTaskDetail'

const StepDescription = ({ index, handleStepRemove }) => {
  const { taskDetail } = useTaskSelector()
  const { control, handleSubmit } = useTaskDetail()

  return (
    <Controller
      name={`steps.${index}.label`}
      control={control}
      rules={{
        onBlur: ({ target: { value } }) => {
          const isValueEmpty = !value
          const isLabelChanged =
            !taskDetail.steps[index] ||
            taskDetail.steps?.[index]?.label !== value

          if (isValueEmpty) handleStepRemove(index)

          if (isLabelChanged) handleSubmit()
        }
      }}
      render={({ field: { onChange, value, name, ref, onBlur } }) => (
        <input
          type='text'
          autoComplete='off'
          className='p-2 m-1 w-full bg-gray-600 rounded-lg cursor-pointer'
          {...{ onBlur, onChange, value, name, ref }}
        />
      )}
    />
  )
}
export default StepDescription
