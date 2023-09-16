import { useState } from 'react'

import UserForm from '../components/UserForm'
import UserInput from '../components/UserInput'
import useUpdateUserData from '../hooks/useUpdateUserData'

import { PasswordSchema } from '../utils/schemas'
import CheckButton from '../../../components/buttons/CheckButton'
import EditButton from '../../../components/buttons/EditButton'

const UpdatePassword = () => {
  const { onSubmit, register } = useUpdateUserData({ schema: PasswordSchema })
  const [isEdit, setIsEdit] = useState(false)

  return (
    <UserForm title='Cambiar Contraseña'>
      <UserInput
        disabled={!isEdit}
        label='Nueva Contraseña'
        id='password'
        register={register}
      />
      <UserInput
        disabled={!isEdit}
        label='Repetir Nueva Contraseña'
        id='passwordConfirmation'
        register={register}
      />

      {!isEdit ? (
        <EditButton onClick={() => setIsEdit(true)} />
      ) : (
        <CheckButton
          onClick={() => {
            setIsEdit(false)
            onSubmit()
          }}
        />
      )}
    </UserForm>
  )
}

export default UpdatePassword
