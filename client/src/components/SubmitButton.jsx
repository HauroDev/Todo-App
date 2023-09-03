const SubmitButton = ({ disabled = false, label = '' }) => {
  return (
    <button
      type='submit'
      disabled={disabled}
      className='mt-2 block w-full bg-gray-800 rounded p-1 border-b-gray-950 hover:border-b-gray-200 active:border-b-gray-50 border-b-2 active:text-gray-500 active:border-gray-500 hover:bg-gray-500 duration-200 disabled:bg-gray-400 disabled:hover:border-b-gray-950 disabled:text-red-400 disabled:active:duration-0'>
      {label}
    </button>
  )
}

export default SubmitButton
