import { useState } from 'react'
import SubmitButton from '../../../components/buttons/SubmitButton'
import UserForm from '../components/UserForm'
import UserInput from '../components/UserInput'
import useUpdateUserData from '../hooks/useUpdateUserData'
import ButtonStyled from '../../../components/buttons/ButtonStyled'
import PencilIcon from '../../../icons/PencilIcon'
import { nameSchema } from '../utils/schemas'

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

export default UpdateNameUser
