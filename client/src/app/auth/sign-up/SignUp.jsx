import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'

import SignUpSVG from './SignUpSVG'

import { signUpSchema } from './utils/schema'
import { AppRoutes } from '../../../utils/routers/app'
import { useUserActions } from '../../../hooks/useUserActions'
import SubmitButton from '../../../components/buttons/SubmitButton'
import LinkButton from '../../../components/buttons/LinkButton'

const UseSignUpForm = () => {
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

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    isDirty,
    onSubmit
  }
}

const RegisterInput = ({
  register,
  name,
  placeholder,
  label,
  type = 'text'
}) => {
  return (
    <div className='flex flex-wrap mb-1'>
      <label
        className='text-gray-300'
        htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        className='pl-1 w-full rounded text-gray-900 placeholder:text-gray-400'
        placeholder={placeholder}
        {...register(name)}
      />
    </div>
  )
}

const RegisterSection = ({ children }) => {
  return <fieldset className='flex flex-col my-2'>{children}</fieldset>
}

const SignUp = () => {
  const { register, handleSubmit, onSubmit, isDirty, isValid } = UseSignUpForm()

  return (
    <div className='bg-gray-600 rounded px-4 pt-4 pb-6'>
      <h2 className='text-4xl text-center'>Crear Cuenta</h2>
      <div className='flex flex-col sm:flex-row justify-center gap-10'>
        <div className='order-1 my-4 mx-auto flex flex-col justify-center items-center sm:order-2 min-w-[10rem] sm:max-w-[20rem]'>
          <SignUpSVG className='w-[10rem] sm:w-[20rem]' />
          <div className='mt-4'>
            <LinkButton to={AppRoutes.landing}>Volver</LinkButton>
          </div>
        </div>
        <form
          className='order-2 sm:order-1 max-w-[20rem]'
          onSubmit={handleSubmit(onSubmit)}>
          <RegisterSection>
            <RegisterInput
              register={register}
              name='firstname'
              label='Nombre'
              placeholder='Joe'
            />
            <RegisterInput
              register={register}
              name='lastname'
              label='Apellido'
              placeholder='Doe'
            />
          </RegisterSection>
          <RegisterSection>
            <RegisterInput
              register={register}
              name='email'
              label='Correo electrónico'
              placeholder='joe_doe@me.com'
            />
            <RegisterInput
              register={register}
              name='username'
              label='Nombre de usuario'
              placeholder='joe_doe'
            />
          </RegisterSection>
          <RegisterSection>
            <RegisterInput
              register={register}
              name='password'
              label='Contraseña'
              placeholder='Contraseña'
              type='password'
            />
            <RegisterInput
              register={register}
              name='passwordConfirmation'
              label='Confirmar contraseña'
              placeholder='Confirmar contraseña'
              type='password'
            />
          </RegisterSection>

          <SubmitButton
            className='mt-4'
            disabled={!isDirty || !isValid}
            label='Enviar'
          />
        </form>
      </div>
    </div>
  )
}

export default SignUp
