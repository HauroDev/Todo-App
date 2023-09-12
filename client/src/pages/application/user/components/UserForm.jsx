const UserForm = ({ title, children }) => {
  return (
    <div className='my-4'>
      <h3 className='text-2xl italic font-semibold text-gray-400'>{title}</h3>
      {children}
    </div>
  )
}

export default UserForm
