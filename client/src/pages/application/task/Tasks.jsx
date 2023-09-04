import { useEffect } from 'react'

import { useTaskSelector, useUserSelector } from '../../../hooks/store'
import useTaskActions from '../../../hooks/useTaskActions'
import useModal from '../../../hooks/useModal'

import TaskCard from './visual/TaskCard'
import TaskDetail from './visual/TaskDetail'
import CreateTask from './create/CreateTask'

import CrossButton from '../../../components/buttons/CrossButton'
import TasksTrashed from './visual/TasksTrashed'
import { useLocation } from 'react-router-dom'
import { AppRoutes } from '../../../utils/routes/appRoutes'

const Tasks = () => {
  const {
    dataUser: { id_user: idUser }
  } = useUserSelector()
  const { tasks } = useTaskSelector()
  const { getTasks, getTaskDetail, clearTaskDetail, clearTasks } =
    useTaskActions()
  const { ModalContainer, toggleModal } = useModal()

  const { pathname } = useLocation()
  const exitToTasks = () => {
    if (pathname !== AppRoutes.home.Tasks) clearTasks()
  }

  useEffect(() => {
    if (!tasks.length) {
      getTasks(idUser)
    }
    return () => exitToTasks()
  }, [])

  return (
    <>
      <h3 className='mt-4 text-3xl text-center'>Tareas</h3>
      <CreateTask />
      <ModalContainer>
        <div className='flex justify-between items-center'>
          <h4 className='text-3xl'>Detalle de la tarea</h4>
          <CrossButton
            onClick={() => {
              clearTaskDetail().then(() => toggleModal())
            }}
          />
        </div>
        <TaskDetail />
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
