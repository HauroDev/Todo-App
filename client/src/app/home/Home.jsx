import TasksImageCarousel from './components/TasksImageGallery'
import LinkButton from '../../components/buttons/LinkButton'
import { useUserSelector } from '../../hooks/store'

import { AppRoutes } from '../../utils/routers/app'

const Paragraph = ({ children }) => (
  <p className='my-2 md:max-w-[70ch] max-w-[50ch]'>{children}</p>
)

const Home = () => {
  const {
    dataUser: { firstname, lastname }
  } = useUserSelector((state) => state.user)

  return (
    <>
      <section className='flex-grow flex flex-col items-center text-center p-2'>
        <h2 className='text-2xl mb-2'>{`¡Bienvenido ${firstname} ${lastname}!`}</h2>
        <h3 className='text-xl'>Introducción</h3>
        <Paragraph>
          Esta aplicación esta para ayudarte a organizar tus tareas durante tus
          sesiones de trabajo o estudios.
        </Paragraph>
        <Paragraph>
          En la sección{' '}
          <span className='inline-block w-fit'>
            <LinkButton to={AppRoutes.home.profile.base}>Cuenta</LinkButton>
          </span>{' '}
          puedes visualizar la información de tu usuario.
        </Paragraph>
        <Paragraph>
          En la sección{' '}
          <span className='inline-block w-fit'>
            <LinkButton to={AppRoutes.home.tasks.base}>Tareas</LinkButton>
          </span>{' '}
          puedes crear, modificar, eliminar y restaurar tareas.
        </Paragraph>
        <TasksImageCarousel />
      </section>
    </>
  )
}

export default Home
