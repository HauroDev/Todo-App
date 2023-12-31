import PlusMark from '../../icons/PlusMark'

const PlusButton = ({ onClick, value }) => {
  return (
    <button
      type='button'
      className='block w-fit bg-gray-700 rounded p-1 border-b-gray-950 hover:border-b-gray-200 active:border-b-gray-50 border-b-2 active:text-gray-800 active:border-gray-500 hover:bg-gray-500 duration-200'
      onClick={onClick}
      value={value}>
      <PlusMark />
    </button>
  )
}

export default PlusButton
