import ButtonStyled from '../../../../components/buttons/ButtonStyled'
import CrossButton from '../../../../components/buttons/CrossButton'
import PlusButton from '../../../../components/buttons/PlusButton'
import { useTaskSelector, useUserSelector } from '../../../../hooks/store'
import useModal from '../../../../hooks/useModal'
import useTaskActions from '../../../../hooks/useTaskActions'
import TrashIcon from '../../../../icons/TrashIcon'

const TaskDeleteCard = (props) => {
  const { hardDeleteTask, restoreTask, getTasksDeleted } = useTaskActions()

  return (
    <div
      key={props.id_task}
      className='flex flex-row gap-1 items-center rounded-lg bg-gray-900 m-1 p-2'>
      <p className='p-2 m-1 w-full bg-gray-600 rounded-lg cursor-pointer'>
        {props.title}
      </p>
      <CrossButton
        onClick={() =>
          hardDeleteTask(props.id_task).then(() =>
            getTasksDeleted(props.id_user)
          )
        }
      />
      <PlusButton
        onClick={() =>
          restoreTask(props.id_task).then(() => getTasksDeleted(props.id_user))
        }
      />
    </div>
  )
}

const TasksTrashed = () => {
  const {
    dataUser: { id_user: idUser }
  } = useUserSelector()
  const { tasksDeleted } = useTaskSelector()
  const { getTasksDeleted } = useTaskActions()
  const { ModalContainer, toggleModal } = useModal()

  return (
    <div>
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

      <div className='fixed bottom-16 right-4'>
        <ButtonStyled
          onClick={() => {
            toggleModal()
            getTasksDeleted(idUser)
          }}>
          <TrashIcon />
        </ButtonStyled>
      </div>
    </div>
  )
}

export default TasksTrashed
