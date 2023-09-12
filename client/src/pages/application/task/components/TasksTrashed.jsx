import ButtonStyled from '../../../../components/buttons/ButtonStyled'
import CrossButton from '../../../../components/buttons/CrossButton'
import { useTaskSelector, useUserSelector } from '../../../../hooks/store'
import useModal from '../../../../hooks/useModal'
import useTaskActions from '../../../../hooks/useTaskActions'
import TrashIcon from '../../../../icons/TrashIcon'
import TaskDeleteCard from './TaskDeleteCard'

const TasksTrashed = () => {
  const {
    dataUser: { id_user: idUser }
  } = useUserSelector()
  const { tasksDeleted } = useTaskSelector()
  const { getTasksDeleted } = useTaskActions()
  const { ModalContainer, toggleModal } = useModal()

  return (
    <>
      <ModalContainer>
        <div className='flex justify-between items-center'>
          <h2>Tareas eliminadas</h2>
          <CrossButton onClick={toggleModal} />
        </div>
        <div>
          {tasksDeleted?.map((task) => (
            <TaskDeleteCard
              key={task.id_task}
              {...task}
            />
          ))}
        </div>
      </ModalContainer>

      <div className='fixed sm:bottom-16 bottom-24 right-4'>
        <ButtonStyled
          onClick={() => {
            toggleModal()
            getTasksDeleted(idUser)
          }}>
          <TrashIcon />
        </ButtonStyled>
      </div>
    </>
  )
}

export default TasksTrashed
