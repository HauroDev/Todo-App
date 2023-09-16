const UserForm = ({ title, children }) => {
  return (
    <article className='flex flex-col gap-2'>
      <h3 className='text-2xl italic font-semibold text-gray-400'>{title}</h3>
      {children}
    </article>
  )
}

export default UserForm
