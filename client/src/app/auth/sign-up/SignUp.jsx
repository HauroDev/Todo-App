import SignUpSVG from './SignUpSVG'

import { AppRoutes } from '../../../utils/routers/app'

import LinkButton from '../../../components/buttons/LinkButton'
import RegisterForm from './components/RegisterForm'

const SignUp = () => {
  return (
    <section className='bg-gray-600 rounded px-4 pt-4 pb-6'>
      <h2 className='text-4xl text-center'>Crear Cuenta</h2>
      <article className='flex flex-col sm:flex-row justify-center gap-10'>
        <RegisterForm />
        <div className='order-1 my-4 mx-auto flex flex-col justify-center items-center sm:order-2 min-w-[10rem] sm:max-w-[20rem]'>
          <SignUpSVG className='w-[10rem] sm:w-[20rem]' />
          <div className='mt-4 w-full'>
            <LinkButton to={AppRoutes.landing}>Volver a Inicio</LinkButton>
          </div>
        </div>
      </article>
    </section>
  )
}

export default SignUp
