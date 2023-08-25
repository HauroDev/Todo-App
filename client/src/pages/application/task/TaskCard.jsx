import { useTaskActions } from '../../../hooks/useTaskActions'

const TaskCard = (props) => {
  const { getTaskDetail } = useTaskActions()

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
          getTaskDetail(props.id_task).then(() => {})
          props.onClick()
        }}
        className='p-2 m-1 w-full bg-gray-600 rounded-lg cursor-pointer'>
        {props.title}
      </p>
    </article>
  )
}
export default TaskCard
