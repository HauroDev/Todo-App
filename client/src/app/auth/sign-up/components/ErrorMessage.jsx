const ErrorMessage = ({ errorField }) => {
  return (
    <p
      className={`${
        errorField?.message ? 'h-max p-1' : 'h-0'
      } w-fit rounded text-red-300 bg-red-500 duration-200 flex flex-col`}>
      {errorField?.message && <span>{errorField?.message}</span>}
    </p>
  )
}

export default ErrorMessage
