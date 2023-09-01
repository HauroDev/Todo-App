import { useState } from 'react'
import { useUserSelector } from '../../../hooks/store'
import { useUserActions } from '../../../hooks/useUserActions'
import ProfileDetailSVG from './ProfileDetailSVG'
import FieldsUserData from './FieldsUserData.jsx'

const UserProfile = () => {
  const { dataUser } = useUserSelector()
  const { updateInfo } = useUserActions()

  const [newData, setNewData] = useState({ ...dataUser })

  // faltan verificaciones básicas como que no pueden ser campos vacíos

  const updatingDataUser = ({ target: { name, value } }) =>
    updateInfo(newData)
      .then(() => {
        setNewData({ ...newData, [name]: value })
      })
      .catch((error) => {
        console.log(error)
        setNewData({ ...dataUser })
      })

  return (
    <div className='flex-grow w-full'>
      <h2 className='text-3xl text-center'>Datos de Cuenta</h2>

      <div className='flex flex-col-reverse justify-center sm:flex-row gap-2'>
        <div className='mx-4 mt-5 mb-4'>
          <FieldsUserData
            label='Nombre de Usuario'
            field='username'
            state={newData.username}
            setState={setNewData}
            updateFunction={updatingDataUser}
          />
          <FieldsUserData
            label='Nombre'
            field='firstname'
            state={newData.firstname}
            setState={setNewData}
            updateFunction={updatingDataUser}
          />
          <FieldsUserData
            label='Apellido'
            field='lastname'
            state={newData.lastname}
            setState={setNewData}
            updateFunction={updatingDataUser}
          />
          <FieldsUserData
            label='Correo Electrónico'
            field='email'
            state={newData.email}
            setState={setNewData}
            updateFunction={updatingDataUser}
          />
        </div>
        <div className='flex flex-col justify-center items-center sm:w-[80ch] p-4'>
          <p>
            Para Editar la información haga doble click en los campos que quiere
            editar, Oprima Enter para Confirmar
          </p>
          <ProfileDetailSVG className='w-72' />
        </div>
      </div>
    </div>
  )
}

export default UserProfile
