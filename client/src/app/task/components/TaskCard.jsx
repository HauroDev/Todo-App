import useTaskActions from '../../../hooks/useTaskActions'
import useChangeStatus from '../hooks/useChangeStatus'
import CrossButton from '../../../components/buttons/CrossButton'

const TaskCard = ({
  title,
  id_task: idTask,
  id_user: idUser,
  status,
  onClick
}) => {
  const { getTasks, softDeleteTask, updateTask } = useTaskActions()

  const handlerChangeStatus = (newStatus) =>
    updateTask({ id_task: idTask, status: newStatus })
      .then(() => getTasks(idUser))
      .catch((error) => console.log(error))

  const { isOpen, StatusButtons, StatusButton } = useChangeStatus(
    status,
    handlerChangeStatus
  )

  return (
    <article className='flex flex-row gap-1 items-center rounded-lg bg-gray-900 m-1 p-2'>
      {isOpen ? StatusButtons : StatusButton}
      {!isOpen && (
        <>
          <p
            onClick={onClick}
            className='p-2 m-1 w-full bg-gray-600 rounded-lg cursor-pointer'>
            {title}
          </p>

          <CrossButton onClick={() => softDeleteTask(idTask)} />
        </>
      )}
    </article>
  )
}
export default TaskCard
