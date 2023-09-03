import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useUserSelector } from '../../../hooks/store'
import { useUserActions } from '../../../hooks/useUserActions'
import { UserDataSchema } from './schema'

import ProfileDetailSVG from './ProfileDetailSVG'
import SubmitButton from '../../../components/SubmitButton'

// decorar y optimizar carga de componente
const UserProfile = () => {
  const { dataUser } = useUserSelector()
  const { updateInfo } = useUserActions()

  const { register, handleSubmit } = useForm({
    defaultValues: {
      id_user: dataUser.id_user,
      firstname: dataUser.firstname,
      lastname: dataUser.lastname,
      username: dataUser.username,
      email: dataUser.email,
      password: '',
      passwordConfirmation: ''
    },
    resolver: zodResolver(UserDataSchema)
  })

  const onSubmit = (data) => {
    updateInfo(data)
  }

  return (
    <div className='flex-grow w-full'>
      <h2 className='text-3xl text-center'>Datos de Cuenta</h2>

      <div className='flex flex-col-reverse justify-center sm:flex-row gap-2'>
        <form
          className='mx-4 mt-5 mb-4'
          onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <legend>Datos de Usuario</legend>
            <input
              type='text'
              className='w-full p-1 mt-4 bg-gray-600 rounded-md'
              {...register('firstname')}
            />
            <input
              type='text'
              className='w-full p-1 mt-4 bg-gray-600 rounded-md'
              {...register('lastname')}
            />
          </fieldset>
          <fieldset>
            <legend>Credenciales</legend>
            <input
              type='text'
              className='w-full p-1 mt-4 bg-gray-600 rounded-md'
              {...register('username')}
            />
            <input
              type='text'
              className='w-full p-1 mt-4 bg-gray-600 rounded-md'
              {...register('email')}
            />
          </fieldset>
          <fieldset>
            <legend>Cambiar Contraseña</legend>
            <input
              type='text'
              className='w-full p-1 mt-4 bg-gray-600 rounded-md'
              {...register('password')}
            />
            <input
              type='text'
              className='w-full p-1 mt-4 bg-gray-600 rounded-md'
              {...register('passwordConfirmation')}
            />
          </fieldset>
          <SubmitButton label='Actualizar' />
        </form>
        <div className='flex flex-col justify-center items-center sm:w-[80ch] p-4'>
          <ProfileDetailSVG className='w-72' />
        </div>
      </div>
    </div>
  )
}

export default UserProfile
