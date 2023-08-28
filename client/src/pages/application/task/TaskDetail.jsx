import { useState } from 'react'
import { useTaskSelector } from '../../../hooks/store'
import useTaskActions from '../../../hooks/useTaskActions'
import useChangeStatus from './hooks/useChangeStatus'
import StepCard from './StepCard'

const TaskDetail = () => {
  const { taskDetail } = useTaskSelector()
  const { updateTask, getTaskDetail, getAllTasks } = useTaskActions()

  const [isEdit, setIsEdit] = useState({
    title: false,
    description: false
  })
  const [dataTask, setDataTask] = useState({
    ...taskDetail
  })

  const { StatusButton, isOpen, toggleOpen, StatusButtons } = useChangeStatus(
    (status) => {
      setDataTask({ ...dataTask, status })
      updatingTask({ ...dataTask, status })
    }
  )

  const updatingTask = (data) =>
    updateTask(data)
      .then(() => getTaskDetail(taskDetail.id_task))
      .then(() => getAllTasks(taskDetail.id_user))
      .catch((error) => console.log(error))

  return (
    <div className='flex flex-col mb-2 mt-5 pb-2'>
      <div onDoubleClick={() => setIsEdit({ ...isEdit, title: true })}>
        {isEdit.title && (
          <input
            type='text'
            className='bg-transparent w-full border-2 border-gray-200 rounded-lg px-1'
            name='title'
            value={dataTask.title}
            onChange={(event) =>
              setDataTask({
                ...dataTask,
                [event.target.name]: event.target.value
              })
            }
            onBlur={() => {
              setIsEdit({ ...isEdit, title: false })
              updatingTask(dataTask)
            }}
            onKeyUp={(event) => {
              if (event.key === 'Enter') {
                setIsEdit({ ...isEdit, title: false })
                updatingTask(dataTask)
              }
            }}
          />
        )}
        {!isEdit.title && <h5>{taskDetail.title}</h5>}
      </div>
      {isOpen && <StatusButtons />}
      {!isOpen && (
        <StatusButton
          status={dataTask.status}
          onClick={toggleOpen}
        />
      )}
      <div onDoubleClick={() => setIsEdit({ ...isEdit, description: true })}>
        {isEdit.description && (
          <textarea
            className='bg-transparent w-full border-2 border-gray-200 rounded-lg px-1'
            name='description'
            value={dataTask.description}
            onChange={(event) =>
              setDataTask({
                ...dataTask,
                [event.target.name]: event.target.value
              })
            }
            onBlur={() => {
              setIsEdit({ ...isEdit, description: false })
              updatingTask(dataTask)
            }}
            onKeyUp={(event) => {
              if (event.key === 'Enter') {
                setIsEdit({ ...isEdit, description: false })
                updatingTask(dataTask)
              }
            }}
          />
        )}
        {!isEdit.description && <p>{taskDetail.description}</p>}
      </div>
      <div>
        {taskDetail.steps?.map((_, index) => (
          <StepCard
            key={index}
            index={index}
            steps={dataTask.steps}
            idTask={taskDetail.id_task}
            idUser={taskDetail.id_user}
          />
        ))}
      </div>
    </div>
  )
}

export default TaskDetail
