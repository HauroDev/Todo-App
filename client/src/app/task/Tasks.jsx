import { useEffect } from 'react'

import { useTaskSelector, useUserSelector } from '../../hooks/store.js'
import useTaskActions from '../../hooks/useTaskActions'
import useModal from '../../hooks/useModal'

import CrossButton from '../../components/buttons/CrossButton.jsx'

import TaskCard from './components/TaskCard'
import TaskDetail from './components/TaskDetail'
import CreateTask from './create/CreateTask'
import TasksTrashed from './components/TasksTrashed.jsx'
import { TaskDetailProvider } from './contexts/TaskDetailContext'

const Tasks = () => {
  const { tasks } = useTaskSelector()
  const { getTaskDetail, clearTaskDetail, getTasks, clearTasks } =
    useTaskActions()
  const { ModalContainer, toggleModal } = useModal()

  const {
    dataUser: { id_user: idUser }
  } = useUserSelector()

  useEffect(() => {
    getTasks(idUser)
    return () => clearTasks()
  }, [])

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
