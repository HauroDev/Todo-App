import { useState } from 'react'

import UserForm from '../components/UserForm'
import UserInput from '../components/UserInput'
import useUpdateUserData from '../hooks/useUpdateUserData'

import { nameSchema } from '../utils/schemas'
import EditButton from '../../../components/buttons/EditButton'
import CheckButton from '../../../components/buttons/CheckButton'

const UpdateNameUser = () => {
  const { onSubmit, register } = useUpdateUserData({ schema: nameSchema })
  const [isEdit, setIsEdit] = useState(false)

  return (
    <UserForm title='Datos de Usuario'>
      <UserInput
        disabled={!isEdit}
        label='Nombre/s'
        id='firstname'
        register={register}
      />
      <UserInput
        disabled={!isEdit}
        label='Apellido/s'
        id='lastname'
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

export default UpdateNameUser
