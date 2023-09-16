import SubmitButton from '../../../../components/buttons/SubmitButton'
import UseSignUpForm from '../hooks/useSignUpForm'
import ErrorMessage from './ErrorMessage'
import RegisterInput from './RegisterInput'
import RegisterSection from './RegisterSection'

const RegisterForm = () => {
  const { register, onSubmit, isDirty, isValid, errors } = UseSignUpForm()

  return (
    <form
      className='order-2 sm:order-1 max-w-[20rem]'
      onSubmit={onSubmit}>
      <RegisterSection>
        <RegisterInput
          register={register}
          name='firstname'
          label='Nombre'
          placeholder='Joe'
        />
        <ErrorMessage errorField={errors.firstname} />
        <RegisterInput
          register={register}
          name='lastname'
          label='Apellido'
          placeholder='Doe'
        />
        <ErrorMessage errorField={errors.lastname} />
      </RegisterSection>
      <RegisterSection>
        <RegisterInput
          register={register}
          name='email'
          label='Correo electrónico'
          placeholder='joe_doe@me.com'
        />
        <ErrorMessage errorField={errors.email} />
        <RegisterInput
          register={register}
          name='username'
          label='Nombre de usuario'
          placeholder='joe_doe'
        />
        <ErrorMessage errorField={errors.username} />
      </RegisterSection>
      <RegisterSection>
        <RegisterInput
          register={register}
          name='password'
          label='Contraseña'
          placeholder='Contraseña'
          type='password'
        />
        <ErrorMessage errorField={errors.password} />
        <RegisterInput
          register={register}
          name='passwordConfirmation'
          label='Confirmar contraseña'
          placeholder='Confirmar contraseña'
          type='password'
        />
        <ErrorMessage errorField={errors.passwordConfirmation} />
      </RegisterSection>
      <SubmitButton
        className='mt-4'
        disabled={!isDirty || !isValid}
        label='Enviar'
      />
    </form>
  )
}

export default RegisterForm
