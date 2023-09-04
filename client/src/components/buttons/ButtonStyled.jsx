const ButtonStyled = (props) => {
  return (
    <button
      className='block w-full bg-gray-700 rounded p-1 border-b-gray-950 hover:border-b-gray-200 active:border-b-gray-50 border-b-2 active:text-gray-800 active:border-gray-500 hover:bg-gray-500 duration-200 disabled:bg-gray-400 disabled:hover:border-b-gray-950 disabled:text-red-400 disabled:active:duration-0'
      {...props}>
      {props.children}
    </button>
  )
}

export default ButtonStyled
