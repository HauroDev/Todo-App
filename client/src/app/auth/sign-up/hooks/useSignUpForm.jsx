import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development'
import { useUserActions } from '../../../../hooks/useUserActions'
import { zodResolver } from '@hookform/resolvers/zod'
import { AppRoutes } from '../../../../utils/routers/app'
import { signUpSchema } from '../utils/schema'
import { useForm } from 'react-hook-form'

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

  const onSubmit = handleSubmit((information) => {
    registerUser(information)
      .then(() => {
        navigate(AppRoutes.landing)
      })
      .catch((err) => {
        console.log(err)
      })
  })

  return {
    register,
    errors,
    isValid,
    isDirty,
    onSubmit
  }
}

export default UseSignUpForm
