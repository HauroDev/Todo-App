import { useEffect } from 'react'
import { useTaskSelector, useUserSelector } from '../../../hooks/store'
import { useTaskActions } from '../../../hooks/useTaskActions'

import useModal from '../../../hooks/useModal'

import TaskCard from './TaskCard'
import TaskDetail from './TaskDetail'
import CreateTask from './create/CreateTask'
import CrossMark from './icons/CrossMark'

const Tasks = () => {
  const {
    dataUser: { id_user: idUser }
  } = useUserSelector((state) => state.user)

  const { tasks } = useTaskSelector((state) => state.task)
  const { clearAllTasks, getAllTasks, clearTaskDetail } = useTaskActions()

  const { ModalContainer, toggleModal } = useModal()

  useEffect(() => {
    getAllTasks(idUser).catch((err) => console.log(err))
    return () => {
      clearAllTasks()
    }
  }, [])

  return (
    <>
      <h3 className='mt-4 text-3xl text-center'>Tareas</h3>

      <CreateTask />
      <ModalContainer>
        <div className='flex justify-between items-center'>
          <h4 className='text-3xl'>Detalle de la tarea</h4>
          <button
            className='block w-fit rounded p-1 border-b-gray-950 hover:border-b-gray-200 active:border-b-gray-50 border-b-2 active:text-gray-500 active:border-gray-500 hover:bg-gray-600 duration-200'
            onClick={async () => {
              await clearTaskDetail()
              toggleModal()
            }}>
            <CrossMark />
          </button>
        </div>
        <TaskDetail />
      </ModalContainer>

      <section className='flex-grow flex flex-col'>
        {tasks?.map((task) => (
          <TaskCard
            key={task.id_task}
            onClick={toggleModal}
            {...task}
          />
        ))}
      </section>
    </>
  )
}

export default Tasks
