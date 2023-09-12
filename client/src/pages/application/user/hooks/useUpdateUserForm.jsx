import { useForm } from 'react-hook-form'
import { useUserSelector } from '../../../../hooks/store'
import { zodResolver } from '@hookform/resolvers/zod'

const useUpdateUserForm = (
  UserSchema,
  onValid = (dataValid) => console.log(dataValid),
  onInvalid = (dataInvalid) => console.log(dataInvalid)
) => {
  const { dataUser } = useUserSelector()

  const { register, handleSubmit, reset, getValues, setValue } = useForm({
    defaultValues: {
      id_user: dataUser.id_user,
      firstname: dataUser.firstname,
      lastname: dataUser.lastname,
      username: dataUser.username,
      email: dataUser.email,
      password: '',
      passwordConfirmation: ''
    },
    resolver: zodResolver(UserSchema)
  })

  const onSubmit = () => {
    const formData = getValues()

    setValue('firstname', formData.firstname.trim())
    setValue('lastname', formData.lastname.trim())
    setValue('username', formData.username.trim())
    setValue('email', formData.email.trim())

    handleSubmit(onValid, onInvalid)()
  }

  return {
    register,
    onSubmit,
    reset
  }
}

export default useUpdateUserForm
