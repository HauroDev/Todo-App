const StatusButton = ({ toggleOpen, status }) => (
  <button
    onClick={toggleOpen}
    className={`${
      status === 'pending'
        ? 'text-orange-600 border-orange-600'
        : status === 'in progress'
        ? 'text-yellow-600 border-yellow-600'
        : 'text-green-600 border-green-600'
    } border-2 p-1 rounded-lg bg-gray-900 text-xs m-1 w-fit`}>
    {status}
  </button>
)

export default StatusButton
