import { useUserSelector } from '../../hooks/store'

const Paragraph = ({ children }) => (
  <p className='my-2 md:w-[80ch] w-[60ch]'>{children}</p>
)

const Home = () => {
  const {
    dataUser: { firstname, lastname }
  } = useUserSelector((state) => state.user)

  return (
    <>
      <h2 className='text-2xl mb-2'>{`¡Bienvenido ${firstname} ${lastname}!`}</h2>
      <section className='flex-grow flex flex-col items-center'>
        <h3 className='text-xl'>Introducción</h3>
        <Paragraph>
          Esta aplicación esta para ayudarte a organizar tus tareas durante tus
          sesiones de trabajo o estudios.
        </Paragraph>
        <Paragraph>
          Cada Slider explicara de forma directa como realizar cada acción
        </Paragraph>
        <h3>Acciones a Explicar</h3>
        <ul>
          <li>como crear una tarea</li>
          <li>como eliminar una tarea</li>
          <li>como editar una tarea</li>
          <li>Como agregar fecha de vencimiento</li>
          <li>Como como agregar repeticiones</li>
        </ul>
        <Paragraph>
          no olvidar agregar imágenes svg para que quede &ldquo;mejor la
          pagina&ldquo;
        </Paragraph>
      </section>
    </>
  )
}

export default Home
