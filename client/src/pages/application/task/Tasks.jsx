import { useEffect } from 'react'

import { useTaskSelector, useUserSelector } from '../../../hooks/store'
import useTaskActions from '../../../hooks/useTaskActions'

import TaskCard from './TaskCard'
import CreateTask from './create/CreateTask'
import useModal from '../../../hooks/useModal'
import CrossMark from '../../../icons/CrossMark'
import TaskDetail from './TaskDetail'

const Tasks = () => {
  const {
    dataUser: { id_user: idUser }
  } = useUserSelector()
  const { tasks } = useTaskSelector()
  const { getAllTasks, clearAllTasks } = useTaskActions()
  const { ModalContainer, toggleModal } = useModal()

  useEffect(() => {
    getAllTasks(idUser)
    return () => clearAllTasks()
  }, [])

  return (
    <>
      <h3 className='mt-4 text-3xl text-center'>Tareas</h3>
      <CreateTask />
      <ModalContainer>
        <div className='flex justify-between items-center'>
          <h4 className='text-3xl'>Detalle de la tarea</h4>
          <button
            onClick={toggleModal}
            className='block w-fit bg-gray-700 rounded p-1 border-b-gray-950 hover:border-b-gray-200 active:border-b-gray-50 border-b-2 active:text-gray-500 active:border-gray-500 hover:bg-gray-500 duration-200'>
            <CrossMark />
          </button>
        </div>
        <TaskDetail />
      </ModalContainer>

      <section className='flex-grow flex flex-col'>
        {tasks?.map((task) => (
          <TaskCard
            key={task.id_task}
            isVisible={toggleModal}
            {...task}
          />
        ))}
      </section>
    </>
  )
}

export default Tasks
