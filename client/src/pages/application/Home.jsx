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
        <h3>Pequeño Tutorial para aprender a utilizar la App</h3>
        <p>
          Tendría que poner un slider con las imágenes y texto para que realize
          cada tarea
        </p>
        <p>Cada Slider explicara de forma directa como realizar cada acción</p>
        <h4>Acciones a Explicar</h4>
        <ul>
          <li>como crear una tarea</li>
          <li>como eliminar una tarea</li>
          <li>como editar una tarea</li>
          <li>Como agregar fecha de vencimiento</li>
          <li>Como como agregar repeticiones</li>
        </ul>
        <p>
          no olvidar agregar imágenes svg para que quede &ldquo;mejor la
          pagina&ldquo;
        </p>
      </div>
    </>
  )
}

export default Home
