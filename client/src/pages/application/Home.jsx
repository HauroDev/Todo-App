import { useUserSelector } from '../../hooks/store'

const Home = () => {
  const {
    dataUser: { firstname, lastname }
  } = useUserSelector((state) => state.user)

  return (
    <>
      <h2 className='text-xl text-gray-100'>
        {`¡Bienvenido ${firstname} ${lastname}!`}
      </h2>
      <div className='flex-grow flex flex-col items-center mt-2 w-[80%] lg:w-[60%]'>
        <h3>Holanda</h3>
        <p>información de las tareas resumidas</p>
      </div>
    </>
  )
}

export default Home
