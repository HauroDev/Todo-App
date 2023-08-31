import { useState } from 'react'
import useTaskActions from '../../../hooks/useTaskActions'
import useChangeStatus from './hooks/useChangeStatus'
import CrossMark from './icons/CrossMark'

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
  const deleteStep = (index) => () => {
    const updatedSteps = [...steps].filter((_, i) => i !== index)
    updatingTask({ id_task: idTask, id_user: idUser, steps: updatedSteps })
  }

  return (
    <article className='flex flex-row gap-1 items-center rounded-lg bg-gray-900 m-1 p-2'>
      {isOpen && <StatusButtons />}
      {!isOpen && (
        <>
          <StatusButton
            status={dataStep.status}
            onClick={toggleOpen}
          />

          <div
            className={`m-1 w-full bg-gray-600 rounded-lg ${
              isEdit ? 'border-2 border-gray-200' : ''
            }`}>
            {isEdit && (
              <textarea
                className='bg-transparent w-full rounded-lg p-2'
                name={`steps[${index}].label`}
                value={dataStep.label}
                onChange={(event) =>
                  setDataStep({
                    ...dataStep,
                    label: event.target.value
                  })
                }
                onTouchStart={(event) =>
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
            {!isEdit && (
              <p
                className='bg-transparent cursor-pointer p-2'
                onDoubleClick={() => setIsEdit(true)}>
                {dataStep.label}
              </p>
            )}
          </div>
          {!isEdit && (
            <button
              className='block w-fit bg-gray-800 rounded p-1 border-b-gray-950 hover:border-b-gray-200 active:border-b-gray-50 border-b-2 active:text-gray-500 active:border-gray-500 hover:bg-gray-500 duration-200 disabled:bg-gray-400 disabled:hover:border-b-gray-950 disabled:active:text-red-400'
              onClick={deleteStep(index)}>
              <CrossMark />
            </button>
          )}
        </>
      )}
    </article>
  )
}

export default StepCard
