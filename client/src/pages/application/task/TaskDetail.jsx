import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { useTaskSelector } from '../../../hooks/store'
import useTaskActions from '../../../hooks/useTaskActions'
import { zodResolver } from '@hookform/resolvers/zod'
import { taskDetailSchema } from './schemas'
import useChangeStatus from './hooks/useChangeStatus'
import CrossButton from '../../../components/CrossButton'
import PlusButton from '../../../components/PlusButton'

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

const TaskDetail = () => {
  const { taskDetail } = useTaskSelector()
  const { updateTask, getAllTasks, getTaskDetail } = useTaskActions()

  const { register, getValues, control, setValue } = useForm({
    defaultValues: { ...taskDetail },
    mode: 'onChange',
    resolver: zodResolver(taskDetailSchema)
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'steps'
  })

  const handleStepAdd = () => append({ label: '', status: 'pending' })
  const handleStepRemove = (index) => remove(index)

  const handleBlur = ({ target: { name, value } }) => {
    if (taskDetail[name] !== value) {
      executeSubmit()
    }
  }

  const executeSubmit = () => {
    const data = getValues()

    updateTask(data)
      .then(() =>
        Promise.all([
          getAllTasks(taskDetail.id_user),
          getTaskDetail(taskDetail.id_task)
        ])
      )
      .catch((error) => console.log(error))
  }

  return (
    <>
      <input
        type='text'
        autoComplete='off'
        className='w-full p-1 mt-4 bg-gray-600 rounded-md'
        placeholder='Titulo'
        {...register('title', {
          onBlur: handleBlur
        })}
      />

      <textarea
        autoComplete='off'
        className='w-full p-1 mt-4 bg-gray-600 rounded-md'
        placeholder='Descripción'
        {...register('description', {
          onBlur: handleBlur
        })}
      />

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
                    executeSubmit()
                  }}
                />
              )}
            />
            <Controller
              name={`steps.${index}.label`}
              control={control}
              rules={{
                onBlur: ({ target: { name, value } }) => {
                  console.log(name, value)
                  const isValueEmpty = !value
                  const isLabelChanged =
                    !taskDetail.steps[index] ||
                    taskDetail.steps?.[index]?.label !== value

                  if (isValueEmpty) handleStepRemove(index)
                  else if (isLabelChanged) executeSubmit()
                }
              }}
              render={({ field: { onChange, value, name, ref, onBlur } }) => (
                <input
                  type='text'
                  autoComplete='off'
                  className='p-2 m-1 w-full bg-gray-600 rounded-lg cursor-pointer'
                  onBlur={onBlur}
                  onKeyDown={({ key }) => {
                    if (key === 'Enter') {
                      handleStepAdd()
                      executeSubmit()
                    }
                  }}
                  {...{ onChange, value, name, ref }}
                />
              )}
            />

            <CrossButton
              onClick={() => {
                handleStepRemove(index)
                executeSubmit()
              }}
            />
          </div>
        ))}

        <PlusButton onClick={handleStepAdd} />
      </div>
    </>
  )
}

export default TaskDetail
