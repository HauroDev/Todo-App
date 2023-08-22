import { Outlet } from 'react-router-dom'
import { useUserSelector } from '../hooks/store'

const Home = () => {
  const {
    dataUser: { firstname, lastname }
  } = useUserSelector((state) => state.user)

  return (
    <div className=' flex flex-col justify-center items-center mt-5'>
      <h2 className='text-4xl text-gray-100'>
        {`¡Bienvenido ${firstname} ${lastname}!`}
      </h2>
      <div className='flex-grow'>
        <Outlet />
      </div>
    </div>
  )
}

export default Home
