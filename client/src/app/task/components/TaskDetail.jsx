import Steps from './steps/Steps'
import useTaskDetail from '../hooks/useTaskDetail'
import StatusChanger from './status/StatusChanger'

const TaskDetail = () => {
  const { handleBlur, register, taskDetail, setValue, handleSubmit } =
    useTaskDetail()

  return (
    <div className='overflow-x-scroll'>
      <StatusChanger
        initialValue={taskDetail.status}
        onChange={(newStatus) => {
          setValue('status', newStatus)
          handleSubmit()
        }}
      />
      <input
        type='text'
        autoComplete='off'
        className='w-full p-1 mt-4 bg-gray-600 rounded-md'
        placeholder='Titulo'
        {...register('title', { onBlur: handleBlur })}
      />
      <textarea
        autoComplete='off'
        className='w-full p-1 mt-4 bg-gray-600 rounded-md'
        placeholder='Descripción'
        {...register('description', { onBlur: handleBlur })}
      />
      <Steps />
    </div>
  )
}

export default TaskDetail
