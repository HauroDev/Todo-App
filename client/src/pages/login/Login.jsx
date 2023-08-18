import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { userAccessRequest } from '../../services/auth'

const infoSchema = z.object({
  username: z.string().nonempty({ message: 'falta nombre de usuario' }),
  password: z.string().nonempty({ message: 'falta contraseña' })
})

import LoginSVG from '../../components/svg/LoginSVG'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: '',
      password: ''
    },
    resolver: zodResolver(infoSchema)
  })

  const navigate = useNavigate()

  const onSubmit = async (credentials) => {
    const isAuthenticated = await userAccessRequest(credentials)

    if (!isAuthenticated) alert('Login failed: user or password is incorrect')
    else {
      alert('Login successful')
      navigate('/', { preventScrollReset: true })
    }
  }

  return (
    <div className='flex-grow flex justify-center items-center my-10'>
      <form
        className='flex flex-col text-white bg-gray-600 rounded w-72 h-fit sm:w-96 pt-10 pb-2 px-4'
        onSubmit={handleSubmit(onSubmit)}>
        <h2 className='text-center text-4xl sm:text-5xl text-gray-200 font-bold my-2'>
          ¡Bienvenido!
        </h2>
        <LoginSVG className='w-40 m-auto mb-4' />
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
            <div
              className={`w-full pt-1 ${
                errors.password ? 'h-4' : 'h-0'
              } text-red-900 transform duration-200`}>
              <p>{errors.password?.message}</p>
            </div>
          </div>
          <button
            disabled={errors.username || errors.password}
            className='bg-gray-700 rounded my-2 p-2 duration-200 hover:bg-gray-500 disabled:bg-gray-300'
            type='submit'>
            Ingresar
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
