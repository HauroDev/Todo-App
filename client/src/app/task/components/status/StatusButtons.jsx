const StatusButtons = ({ changeStatus }) => (
  <div className='flex gap-1'>
    <button
      onClick={changeStatus}
      value='pending'
      className='text-xs text-orange-600 border-orange-600 border-2 p-1 rounded-lg bg-gray-900'>
      pending
    </button>

    <button
      onClick={changeStatus}
      value='in progress'
      className='text-xs text-yellow-600 border-yellow-600 border-2 p-1 rounded-lg bg-gray-900'>
      in progress
    </button>

    <button
      onClick={changeStatus}
      value='completed'
      className='text-xs text-green-600 border-green-600 border-2 p-1 rounded-lg bg-gray-900'>
      completed
    </button>
  </div>
)

export default StatusButtons
