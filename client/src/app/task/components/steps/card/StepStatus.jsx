import { Controller } from 'react-hook-form'
import StatusChanger from './StatusChanger'
import useTaskDetail from '../../../hooks/useTaskDetail'

const StepStatus = ({ index }) => {
  const { control, setValue, handleSubmit } = useTaskDetail()

  return (
    <Controller
      name={`steps.${index}.status`}
      control={control}
      render={({ field: { value, name } }) => (
        <StatusChanger
          initialValue={value}
          onChange={(newStatus) => {
            setValue(name, newStatus)
            handleSubmit()
          }}
        />
      )}
    />
  )
}

export default StepStatus
