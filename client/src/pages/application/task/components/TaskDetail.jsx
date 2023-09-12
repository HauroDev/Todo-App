import Steps from './steps/Steps'
import useTaskDetail from '../hooks/useTaskDetail'

const TaskDetail = () => {
  const { handleBlur, register } = useTaskDetail()

  return (
    <>
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
    </>
  )
}

export default TaskDetail
