import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'

import SignInSVG from './SignInSVG'

import { SignInSchema } from './utils/schema'
import { useUserActions } from '../../../hooks/useUserActions'
import { AppRoutes } from '../../../utils/routers/app'
import SubmitButton from '../../../components/buttons/SubmitButton'

const SignInPage = () => {
  const { loginUser } = useUserActions()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: '',
      password: ''
    },
    mode: 'onChange',
    resolver: zodResolver(SignInSchema)
  })

  const navigate = useNavigate()

  const onSubmit = (credentials) => {
    loginUser(credentials)
      .then(() => {
        navigate(AppRoutes.landing)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <form
      className='flex flex-col text-white bg-gray-600 rounded w-72 h-fit sm:w-96 pt-10 pb-2 px-4'
      onSubmit={handleSubmit(onSubmit)}>
      <h2 className='text-center text-4xl sm:text-5xl text-gray-200 font-bold my-2'>
        Iniciar Sesión
      </h2>
      <SignInSVG className='w-40 m-auto mb-4' />
      <div className='flex flex-col gap-3'>
        <div className='flex flex-wrap mb-1'>
          <label
            className='text-gray-300'
            htmlFor='username'>
            Usuario
          </label>
          <input
            autoComplete='off'
            className='pl-1 w-full rounded text-gray-900 placeholder:text-gray-400'
            placeholder='userRegister3000'
            type='text'
            {...register('username')}
          />
          <p
            className={`w-full pt-1 ${
              errors.username ? 'h-5' : 'h-0'
            } text-red-900 transform duration-200`}>
            {errors.username?.message}
          </p>
        </div>
        <div className='flex flex-wrap mb-1'>
          <label
            className='text-gray-300'
            htmlFor='password'>
            Contraseña
          </label>
          <input
            autoComplete='off'
            className='pl-1 w-full rounded text-gray-900 placeholder:text-gray-400'
            placeholder='superSecretPassword'
            type='password'
            {...register('password')}
          />

          <p
            className={`w-full pt-1 ${
              errors.password ? 'h-5' : 'h-0'
            } text-red-900 transform duration-200`}>
            {errors.password?.message}
          </p>
        </div>
        <SubmitButton
          disabled={errors.username || errors.password}
          label='Ingresar'
        />
      </div>
    </form>
  )
}

export default SignInPage
