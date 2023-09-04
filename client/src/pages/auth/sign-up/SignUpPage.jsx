import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'

import SignUpSVG from './SignUpSVG'

import { signUpSchema } from './schema'
import { AppRoutes } from '../../../utils/routes/appRoutes'
import { useUserActions } from '../../../hooks/useUserActions'

const SignUpPage = () => {
  const { registerUser } = useUserActions()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty }
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
      email: '',
      firstname: '',
      lastname: ''
    },
    mode: 'onChange',
    resolver: zodResolver(signUpSchema)
  })

  const navigate = useNavigate()

  const onSubmit = (information) => {
    registerUser(information)
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
        Crear Cuenta
      </h2>
      <SignUpSVG className='w-40 m-auto mb-4' />
      <fieldset className='flex flex-col gap-3'>
        <div className='flex flex-wrap mb-1'>
          <label
            className='text-gray-300'
            htmlFor='firstname'>
            Nombre
          </label>
          <input
            className='pl-1 w-full rounded text-gray-900 placeholder:text-gray-400'
            placeholder='Joe'
            {...register('firstname')}
          />
          <div
            className={`w-full pt-1 ${
              errors.firstname ? 'h-5' : 'h-0'
            } text-red-900 transform duration-200`}>
            <p>{errors.firstname?.message}</p>
          </div>
        </div>
        <div className='flex flex-wrap mb-1'>
          <label
            className='text-gray-300'
            htmlFor='lastname'>
            Apellido
          </label>
          <input
            className='pl-1 w-full rounded text-gray-900 placeholder:text-gray-400'
            placeholder='Doe'
            {...register('lastname')}
          />
          <div
            className={`w-full pt-1 ${
              errors.lastname ? 'h-4' : 'h-0'
            } text-red-900 transform duration-200`}>
            <p>{errors.lastname?.message}</p>
          </div>
        </div>
      </fieldset>
      <fieldset className='flex flex-col gap-3'>
        <div className='flex flex-wrap mb-1'>
          <label
            className='text-gray-300'
            htmlFor='username'>
            Nombre de usuario
          </label>
          <input
            className='pl-1 w-full rounded text-gray-900 placeholder:text-gray-400'
            placeholder='userSuper30123'
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
            htmlFor='email'>
            Correo Electrónico
          </label>
          <input
            className='pl-1 w-full rounded text-gray-900 placeholder:text-gray-400'
            placeholder='Doe'
            {...register('email')}
          />
          <div
            className={`w-full pt-1 ${
              errors.email ? 'h-4' : 'h-0'
            } text-red-900 transform duration-200`}>
            <p>{errors.email?.message}</p>
          </div>
        </div>
      </fieldset>
      <fieldset className='flex flex-col gap-3'>
        <div className='flex flex-wrap mb-1'>
          <label
            className='text-gray-300'
            htmlFor='password'>
            Contraseña
          </label>
          <input
            className='pl-1 w-full rounded text-gray-900 placeholder:text-gray-400'
            type='password'
            {...register('password')}
          />
          <div
            className={`w-full pt-1 ${
              errors.password ? 'h-5' : 'h-0'
            } text-red-900 transform duration-200`}>
            <p>{errors.password?.message}</p>
          </div>
        </div>
        <div className='flex flex-wrap mb-1'>
          <label
            className='text-gray-300'
            htmlFor='passwordConfirmation'>
            Confirma tu contraseña
          </label>
          <input
            className='pl-1 w-full rounded text-gray-900 placeholder:text-gray-400'
            type='password'
            {...register('passwordConfirmation')}
          />
          <div
            className={`w-full pt-1 ${
              errors.passwordConfirmation ? 'h-4' : 'h-0'
            } text-red-900 transform duration-200`}>
            <p>{errors.passwordConfirmation?.message}</p>
          </div>
        </div>
        <button
          disabled={!isDirty || !isValid}
          className='bg-gray-700 rounded my-2 p-2 duration-200 hover:bg-gray-500 disabled:bg-gray-300'
          type='submit'>
          Enviar
        </button>
      </fieldset>
    </form>
  )
}

export default SignUpPage
