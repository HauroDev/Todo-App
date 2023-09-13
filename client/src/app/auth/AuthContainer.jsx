import { Outlet } from 'react-router-dom'

const AuthContainer = () => {
  return (
    <div className='flex-grow flex justify-center items-center my-10'>
      <Outlet />
    </div>
  )
}
export default AuthContainer
