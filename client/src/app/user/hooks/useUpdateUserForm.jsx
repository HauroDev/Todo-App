import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useUserSelector } from '../../../hooks/store'

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

  const cleanField = (value) => value.trim()

  const onSubmit = () => {
    const formData = getValues()
    const cleanedFormData = {
      ...formData,
      firstname: cleanField(formData.firstname),
      lastname: cleanField(formData.lastname),
      username: cleanField(formData.username),
      email: cleanField(formData.email)
    }

    const isDataChanged =
      cleanedFormData.firstname !== dataUser.firstname ||
      cleanedFormData.lastname !== dataUser.lastname ||
      cleanedFormData.username !== dataUser.username ||
      cleanedFormData.email !== dataUser.email

    if (isDataChanged) {
      setValue('firstname', cleanedFormData.firstname)
      setValue('lastname', cleanedFormData.lastname)
      setValue('username', cleanedFormData.username)
      setValue('email', cleanedFormData.email)

      handleSubmit(onValid, onInvalid)()
    }
  }

  return {
    register,
    onSubmit,
    reset
  }
}

export default useUpdateUserForm
