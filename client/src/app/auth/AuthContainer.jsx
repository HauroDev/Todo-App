import { Outlet } from 'react-router-dom'

const AuthContainer = () => {
  return (
    <section className='flex-grow flex justify-center items-center my-10'>
      <Outlet />
    </section>
  )
}
export default AuthContainer
