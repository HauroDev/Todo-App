const RegisterInput = ({
  register,
  name,
  placeholder,
  label,
  type = 'text'
}) => {
  return (
    <div className='flex flex-wrap mb-1'>
      <label
        className='text-gray-300'
        htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        className='pl-1 w-full rounded text-gray-900 placeholder:text-gray-400'
        placeholder={placeholder}
        {...register(name)}
      />
    </div>
  )
}

export default RegisterInput
