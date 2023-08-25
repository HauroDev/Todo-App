import { useTaskActions } from '../../../hooks/useTaskActions'
import CrossMark from './icons/CrossMark'

const TaskCard = (props) => {
  const { getTaskDetail, deleteTask } = useTaskActions()

  return (
    <article className='flex flex-row gap-1 items-center rounded-lg bg-gray-900 m-1 p-2'>
      <span
        className={`${
          props.status === 'pending'
            ? 'text-yellow-600 border-yellow-600'
            : props.status === 'in progress'
            ? 'text-orange-600 border-orange-600'
            : 'text-green-600 border-green-600'
        } border-2 p-1 rounded-lg`}>
        {props.status}
      </span>
      <p
        onClick={() => {
          getTaskDetail(props.id_task).then(() => {
            props.onClick()
          })
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
    </article>
  )
}
export default TaskCard
