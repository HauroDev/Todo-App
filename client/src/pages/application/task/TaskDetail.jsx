import { useTaskSelector } from '../../../hooks/store'

const TaskDetail = () => {
  const { taskDetail } = useTaskSelector((state) => state.task)

  return (
    <>
      <div className='flex justify-around items-center border-b-gray-200 border-b-2 mb-2 mt-5 pb-2'>
        <h5 className='text-xl font-bold italic'>Título: {taskDetail.title}</h5>
        <p
          className={`${
            taskDetail.status === 'pending'
              ? 'text-yellow-600 border-yellow-600'
              : taskDetail.status === 'in progress'
              ? 'text-orange-600 border-orange-600'
              : 'text-green-600 border-green-600'
          } border-2 p-1 rounded-lg w-fit`}>
          {taskDetail.status}
        </p>
      </div>

      {taskDetail.description && (
        <div className='my-4 text-lg flex flex-col px-5'>
          <p className='font-semibold'>Descripción:</p>{' '}
          <p className='italic'>{taskDetail.description}</p>
        </div>
      )}

      {taskDetail.steps?.length && (
        <div className='p-1 mb-2 border-2 border-gray-200 rounded-lg'>
          <h4 className='text-2xl'>
            <span>{taskDetail.steps?.length}</span>{' '}
            {taskDetail.steps?.length >= 1 ? 'Pasos' : 'Paso'}
          </h4>

          {taskDetail.steps?.map((step, i) => (
            <div
              key={i}
              className='p-2 m-1 bg-gray-950 flex gap-2 rounded-lg items-center'>
              <p
                className={`${
                  step.status === 'pending'
                    ? 'text-yellow-600 border-yellow-600'
                    : step.status === 'in progress'
                    ? 'text-orange-600 border-orange-600'
                    : 'text-green-600 border-green-600'
                } border-2 p-1 rounded-lg w-fit mt-2 mb-4`}>
                {step.status}
              </p>
              <p className='bg-gray-600 p-1 rounded-lg w-full'>{step.label}</p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default TaskDetail
