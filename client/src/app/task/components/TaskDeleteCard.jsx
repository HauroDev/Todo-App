import CrossButton from '../../../components/buttons/CrossButton'
import PlusButton from '../../../components/buttons/PlusButton'
import useTaskActions from '../../../hooks/useTaskActions'

const useTaskOptions = (idTask, idUser) => {
  const { hardDeleteTask, restoreTask, getTasksDeleted } = useTaskActions()

  const destroyTask = () =>
    hardDeleteTask(idTask).then(() => getTasksDeleted(idUser))

  const revertTask = () =>
    restoreTask(idTask).then(() => getTasksDeleted(idUser))

  return { destroyTask, revertTask }
}

const TaskDeleteCard = (props) => {
  const { destroyTask, revertTask } = useTaskOptions(
    props.id_task,
    props.id_user
  )

  return (
    <article className='flex flex-row gap-1 items-center rounded-lg bg-gray-900 m-1 p-2'>
      <p className='p-2 m-1 w-full bg-gray-600 rounded-lg'>{props.title}</p>
      <CrossButton onClick={destroyTask} />
      <PlusButton onClick={revertTask} />
    </article>
  )
}

export default TaskDeleteCard
