import { useState } from 'react'
import SubmitButton from '../../../components/buttons/SubmitButton'
import UserForm from '../components/UserForm'
import UserInput from '../components/UserInput'
import useUpdateUserData from '../hooks/useUpdateUserData'
import ButtonStyled from '../../../components/buttons/ButtonStyled'
import PencilIcon from '../../../icons/PencilIcon'
import { UsernameEmailSchema } from '../utils/schemas'

const UpdateCredentialUser = () => {
  const { onSubmit, register } = useUpdateUserData({
    schema: UsernameEmailSchema
  })
  const [isEdit, setIsEdit] = useState(false)

  return (
    <UserForm>
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
        <ButtonStyled
          onClick={() => setIsEdit(true)}
          className='max-w-fit'>
          <PencilIcon />
        </ButtonStyled>
      ) : (
        <SubmitButton
          label='Actualizar'
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
