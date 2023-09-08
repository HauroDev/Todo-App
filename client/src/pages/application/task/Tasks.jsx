import { useEffect } from 'react'

import { useTaskSelector, useUserSelector } from '../../../hooks/store'
import useTaskActions from '../../../hooks/useTaskActions'
import useModal from '../../../hooks/useModal'

import TaskCard from './visual/TaskCard'
import TaskDetail from './visual/TaskDetail'
import CreateTask from './create/CreateTask'

import CrossButton from '../../../components/buttons/CrossButton'
import TasksTrashed from './visual/TasksTrashed'
import { TaskDetailProvider } from './contexts/TaskDetailContext'

const useGetTaskUser = () => {
  const { getTasks, clearTasks } = useTaskActions()

  const {
    dataUser: { id_user: idUser }
  } = useUserSelector()

  useEffect(() => {
    getTasks(idUser)
    return () => clearTasks()
  }, [])
}

const Tasks = () => {
  const { tasks } = useTaskSelector()
  const { getTaskDetail, clearTaskDetail } = useTaskActions()
  const { ModalContainer, toggleModal } = useModal()

  useGetTaskUser()

  return (
    <>
      <h2 className='mt-4 text-3xl text-center'>Tareas</h2>
      <CreateTask />
      <ModalContainer>
        <div className='flex justify-between items-center'>
          <h3 className='text-3xl'>Detalle de la tarea</h3>
          <CrossButton
            onClick={() => {
              clearTaskDetail().then(() => toggleModal())
            }}
          />
        </div>
        <TaskDetailProvider>
          <TaskDetail />
        </TaskDetailProvider>
      </ModalContainer>

      <section className='flex-grow flex flex-col'>
        {tasks?.map((task) => (
          <TaskCard
            key={task.id_task}
            onClick={() =>
              getTaskDetail(task.id_task).then(() => toggleModal())
            }
            {...task}
          />
        ))}
      </section>

      <TasksTrashed />
    </>
  )
}

export default Tasks
