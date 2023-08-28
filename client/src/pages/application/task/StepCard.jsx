import { useState } from 'react'
import useTaskActions from '../../../hooks/useTaskActions'
import useChangeStatus from './hooks/useChangeStatus'

const StepCard = ({ steps, index, idTask, idUser }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [dataStep, setDataStep] = useState({ ...steps[index] })
  const { updateTask, getTaskDetail } = useTaskActions()

  const { StatusButton, StatusButtons, isOpen, toggleOpen } = useChangeStatus(
    (status) => {
      setDataStep({ ...dataStep, status })
      updatingSteps({ ...dataStep, status }, index)
    }
  )

  const updatingSteps = (step, index) => {
    const updatedSteps = [...steps]
    updatedSteps[index] = step
    updatingTask({ id_task: idTask, id_user: idUser, steps: updatedSteps })
  }

  const updatingTask = (data) =>
    updateTask(data)
      .then(() => {
        getTaskDetail(idTask)
      })
      .catch((error) => console.log(error))

  return (
    <div className='flex w-full'>
      {isOpen && <StatusButtons />}
      {!isOpen && (
        <StatusButton
          status={dataStep.status}
          onClick={toggleOpen}
        />
      )}
      {isEdit && (
        <input
          className='bg-transparent w-full border-2 border-gray-200 rounded-lg px-1'
          name={`steps[${index}].label`}
          value={dataStep.label}
          onChange={(event) =>
            setDataStep({
              ...dataStep,
              label: event.target.value
            })
          }
          onBlur={() => {
            setIsEdit(false)
            updatingSteps(dataStep, index)
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              setIsEdit(false)
              updatingSteps(dataStep, index)
            }
          }}
        />
      )}
      {!isEdit && <p onDoubleClick={() => setIsEdit(true)}>{dataStep.label}</p>}
    </div>
  )
}

export default StepCard
