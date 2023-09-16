const UserInput = ({ label, id, disabled, register, type = 'text' }) => {
  return (
    <div>
      <label
        className='text-xl font-bold'
        htmlFor={id}>
        {label}
      </label>
      <input
        disabled={disabled}
        type={type}
        id={id}
        className='w-full p-1 bg-gray-500 rounded-md disabled:italic'
        {...register(id)}
      />
    </div>
  )
}

export default UserInput
