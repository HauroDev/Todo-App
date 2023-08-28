import CrossMark from './icons/CrossMark'

import useTaskActions from '../../../hooks/useTaskActions'
import useChangeStatus from './hooks/useChangeStatus'

const TaskCard = (props) => {
  const { getTaskDetail, deleteTask, updateTask, getAllTasks } =
    useTaskActions()

  const { isOpen, StatusButtons, toggleOpen, StatusButton } = useChangeStatus(
    (newStatus) =>
      updateTask({ id_task: props.id_task, status: newStatus })
        .then(() => getAllTasks(props.id_user))
        .then(() => toggleOpen())
  )

  return (
    <article className='flex flex-row gap-1 items-center rounded-lg bg-gray-900 m-1 p-2'>
      {isOpen && <StatusButtons />}
      {!isOpen && (
        <>
          <StatusButton
            onClick={toggleOpen}
            status={props.status}
          />

          <p
            onClick={() => {
              getTaskDetail(props.id_task).then(() => props.isVisible())
            }}
            className='p-2 m-1 w-full bg-gray-600 rounded-lg cursor-pointer'>
            {props.title}
          </p>

          <button
            className='block w-fit bg-gray-800 rounded p-1 border-b-gray-950 hover:border-b-gray-200 active:border-b-gray-50 border-b-2 active:text-gray-500 active:border-gray-500 hover:bg-gray-500 duration-200 disabled:bg-gray-400 disabled:hover:border-b-gray-950 disabled:active:text-red-400'
            onClick={() => {
              deleteTask(props.id_task)
            }}>
            <CrossMark />
          </button>
        </>
      )}
    </article>
  )
}
export default TaskCard
