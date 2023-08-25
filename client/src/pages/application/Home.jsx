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
      <div className='flex-grow w-[80%] lg:w-[70%]'></div>
    </>
  )
}

export default Home
