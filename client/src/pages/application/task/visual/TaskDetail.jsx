import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { taskDetailSchema } from '../schemas'

import { useTaskSelector } from '../../../../hooks/store'
import useTaskActions from '../../../../hooks/useTaskActions'
import useChangeStatus from '../hooks/useChangeStatus'

import CrossButton from '../../../../components/buttons/CrossButton'
import PlusButton from '../../../../components/buttons/PlusButton'

const StatusChanger = ({ initialValue, onChange }) => {
  const { isOpen, StatusButton, StatusButtons } = useChangeStatus(
    initialValue,
    onChange
  )

  return (
    <>
      {isOpen && <StatusButtons />}
      {!isOpen && <StatusButton />}
    </>
  )
}

const Steps = ({ control, setValue, handleSubmit, taskDetail }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'steps'
  })

  const handleStepAdd = () => append({ label: '', status: 'pending' })
  const handleStepRemove = (index) => remove(index)

  return (
    <div className='flex flex-col gap-2 w-full'>
      {fields.map((step, index) => (
        <div
          key={step.id}
          className='flex flex-row gap-1 items-center rounded-lg bg-gray-900 p-2'>
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
                else if (isLabelChanged) handleSubmit()
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

          <CrossButton
            onClick={() => {
              handleStepRemove(index)
              handleSubmit()
            }}
          />
        </div>
      ))}

      <PlusButton onClick={handleStepAdd} />
    </div>
  )
}

const TaskDetail = () => {
  const { taskDetail } = useTaskSelector()
  const { updateTask, getTaskDetail } = useTaskActions()

  const { register, getValues, control, setValue, reset } = useForm({
    defaultValues: { ...taskDetail },
    mode: 'onChange',
    resolver: zodResolver(taskDetailSchema)
  })

  const handleBlur = ({ target: { name, value } }) => {
    if (taskDetail[name] !== value) {
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    const formData = getValues()

    updateTask(formData)
      .then(() => getTaskDetail(taskDetail.id_task))
      .then(() => reset())
      .catch((error) => console.log(error))
  }
  return (
    <>
      <input
        type='text'
        autoComplete='off'
        className='w-full p-1 mt-4 bg-gray-600 rounded-md'
        placeholder='Titulo'
        {...register('title', { onBlur: handleBlur })}
      />
      <textarea
        autoComplete='off'
        className='w-full p-1 mt-4 bg-gray-600 rounded-md'
        placeholder='Descripción'
        {...register('description', { onBlur: handleBlur })}
      />
      <Steps {...{ control, setValue, handleSubmit, taskDetail }} />
    </>
  )
}

export default TaskDetail
