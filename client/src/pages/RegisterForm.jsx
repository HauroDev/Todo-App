import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterFormSchema } from './schemas/registerForm'
import RegisterSVG from '../components/svg/RegisterSVG'
import { useState } from 'react'
import { registerRequest } from '../services/auth'
import { useNavigate } from 'react-router-dom'
import { routerName } from '../utils/routes/appRoutes'

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, dirtyFields }
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
    resetOptions: { keepIsValid: true },
    resolver: zodResolver(RegisterFormSchema)
  })

  const navigate = useNavigate()

  const onValid = async (credentials) => {
    try {
      const response = await registerRequest(credentials)

      console.log(response)

      alert('registration successfully')
      navigate(routerName.login)
    } catch (error) {
      alert(error.message)
    }
  }

  const onInvalid = (credentials) => {
    console.log(credentials, errors)
  }

  const [changeFieldset, setChangeFieldset] = useState(1)

  const nextFieldset = () => {
    setChangeFieldset((p) => {
      const next = p + 1
      console.log(next)
      return next
    })
  }

  return (
    <div className='flex-grow flex justify-center items-center my-10'>
      <form
        className='flex flex-col text-white bg-gray-600 rounded w-72 h-fit sm:w-96 pt-10 pb-2 px-4'
        onSubmit={handleSubmit(onValid, onInvalid)}>
        <h2 className='text-center text-4xl sm:text-5xl text-gray-200 font-bold my-2'>
          ¡Bienvenido!
        </h2>
        <RegisterSVG className='w-40 m-auto mb-4' />

        <fieldset
          className={`${
            changeFieldset === 1 ? 'flex' : 'hidden'
          } flex-col gap-3`}>
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
          <button
            type='button'
            onClick={nextFieldset}
            disabled={!dirtyFields.firstname || !dirtyFields.lastname}
            className='bg-gray-700 rounded my-2 p-2 duration-200 hover:bg-gray-500 disabled:bg-gray-300'>
            Siguiente
          </button>
        </fieldset>
        <fieldset
          className={`${
            changeFieldset === 2 ? 'flex' : 'hidden'
          } flex-col gap-3 duration-500`}>
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
            <div
              className={`w-full pt-1 ${
                errors.username ? 'h-5' : 'h-0'
              } text-red-900 transform duration-200`}>
              <p>{errors.username?.message}</p>
            </div>
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
          <button
            type='button'
            onClick={nextFieldset}
            disabled={!dirtyFields.email || !dirtyFields.username}
            className='bg-gray-700 rounded my-2 p-2 duration-200 hover:bg-gray-500 disabled:bg-gray-300'>
            Siguiente
          </button>
        </fieldset>
        <fieldset
          className={`${
            changeFieldset === 3 ? 'flex' : 'hidden'
          } flex-col gap-3`}>
          <div className='flex flex-wrap mb-1'>
            <label
              className='text-gray-300'
              htmlFor='password'>
              Contraseña
            </label>
            <input
              className='pl-1 w-full rounded text-gray-900 placeholder:text-gray-400'
              placeholder='Joe'
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
              placeholder='Doe'
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
    </div>
  )
}

export default RegisterForm
