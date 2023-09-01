import Steps from './Steps'
import { useState } from 'react'
import { useTaskSelector } from '../../../hooks/store'
import useChangeStatus from './hooks/useChangeStatus'
import useTaskActions from '../../../hooks/useTaskActions'

const TaskDetail = () => {
  const { taskDetail } = useTaskSelector()
  const { getAllTasks, getTaskDetail, updateTask } = useTaskActions()

  const [isEdit, setIsEdit] = useState({ title: false, description: false })
  const [newTaskDetail, setNewTaskDetail] = useState({ ...taskDetail })

  const handlerChangeStatus = (newStatus) =>
    updateTask({ id_task: taskDetail.id_task, status: newStatus })
      .then(() =>
        Promise.all([
          getAllTasks(taskDetail.id_user),
          getTaskDetail(taskDetail.id_task)
        ])
      )
      .then(() => console.log('updated status: ' + newStatus))

  const { isOpen, StatusButtons, StatusButton } =
    useChangeStatus(handlerChangeStatus)

  const handlerChangeField = ({ target: { name, value } }) =>
    setNewTaskDetail({ ...newTaskDetail, [name]: value })

  const handlerFieldBlur =
    (field) =>
    ({ target: { name } }) =>
      taskDetail[name] !== newTaskDetail[name]
        ? updateTask({ ...newTaskDetail })
            .then(() =>
              Promise.all([
                getAllTasks(taskDetail.id_user),
                getTaskDetail(taskDetail.id_task)
              ])
            )
            .then(() => setIsEdit({ ...isEdit, [field]: false }))
        : setIsEdit({ ...isEdit, [field]: false })

  const handlerFieldKeyDown =
    (field) =>
    ({ key, target: { name } }) => {
      if (key === 'Enter')
        if (taskDetail[name] !== newTaskDetail[name]) {
          updateTask({ ...newTaskDetail })
            .then(() =>
              Promise.all([
                getAllTasks(taskDetail.id_user),
                getTaskDetail(taskDetail.id_task)
              ])
            )
            .then(() => setIsEdit({ ...isEdit, [field]: false }))
        } else {
          setIsEdit({ ...isEdit, [field]: false })
        }
    }

  return (
    <>
      <div className='flex flex-col mb-2 mt-5 pb-2'>
        <div onDoubleClick={() => setIsEdit({ ...isEdit, title: true })}>
          {isEdit.title && (
            <input
              type='text'
              className={`${
                isEdit.title ? 'border-2 border-gray-200' : ''
              } my-3 bg-transparent w-full rounded-lg`}
              name='title'
              value={newTaskDetail.title}
              onChange={handlerChangeField}
              onBlur={handlerFieldBlur('title')}
              onKeyDown={handlerFieldKeyDown('title')}
            />
          )}
          {!isEdit.title && <h5>{newTaskDetail.title}</h5>}
        </div>

        <div className='flex justify-center items-center'>
          {isOpen && <StatusButtons />}
          {!isOpen && <StatusButton status={newTaskDetail.status} />}
        </div>

        <div onDoubleClick={() => setIsEdit({ ...isEdit, description: true })}>
          {isEdit.description && (
            <textarea
              onFocus={(event) => event.target.setSelectionRange(0)}
              name='description'
              className={`${
                isEdit.description ? 'border-2 border-gray-200' : ''
              } my-3 bg-transparent w-full rounded-lg`}
              value={newTaskDetail.description}
              onChange={handlerChangeField}
              onBlur={handlerFieldBlur('description')}
              onKeyDown={handlerFieldKeyDown('description')}
            />
          )}
          {!isEdit.description && <p>{newTaskDetail.description}</p>}
        </div>
        <div className='flex flex-col gap-1 items-center rounded-lg bg-gray-700 m-1 p-2'>
          {taskDetail.steps?.map((_, index) => (
            <Steps
              key={index}
              index={index}
              steps={taskDetail.steps}
              idTask={taskDetail.id_task}
              idUser={taskDetail.id_user}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default TaskDetail
