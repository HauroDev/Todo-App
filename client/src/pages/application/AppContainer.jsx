import { Outlet } from 'react-router-dom'

const AppContainer = () => {
  return (
    <div className='flex flex-col justify-center items-center mt-5 w-full'>
      <Outlet />
    </div>
  )
}
export default AppContainer
