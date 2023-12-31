import { useState } from 'react'

import UserForm from '../components/UserForm'
import UserInput from '../components/UserInput'
import useUpdateUserData from '../hooks/useUpdateUserData'

import { UsernameEmailSchema } from '../utils/schemas'
import EditButton from '../../../components/buttons/EditButton'
import CheckButton from '../../../components/buttons/CheckButton'

const UpdateCredentialUser = () => {
  const { onSubmit, register } = useUpdateUserData({
    schema: UsernameEmailSchema
  })
  const [isEdit, setIsEdit] = useState(false)

  return (
    <UserForm title='Credenciales'>
      <UserInput
        disabled={!isEdit}
        label='Nombre de Usuario'
        id='username'
        register={register}
      />
      <UserInput
        disabled={!isEdit}
        label='email'
        id='email'
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

export default UpdateCredentialUser
