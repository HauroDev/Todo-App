import { useState } from 'react'
import { useUserSelector } from '../../../hooks/store'
import { useUserActions } from '../../../hooks/useUserActions'
import ProfileDetailSVG from './ProfileDetailSVG'

const UserProfile = () => {
  const { dataUser } = useUserSelector()
  const { updateInfo } = useUserActions()
  const [isEdit, setIsEdit] = useState({
    username: false,
    firstname: false,
    lastname: false,
    email: false
  })
  const [newData, setNewData] = useState({ ...dataUser })

  const changeEdit =
    (field, isEditable = false) =>
    () =>
      setIsEdit({ ...isEdit, [field]: isEditable })

  const changeInputText = (event) =>
    setNewData({ ...newData, [event.target.name]: event.target.value })

  const updatingDataUser = (event) => {
    updateInfo(newData)
      .then(() => {
        changeEdit(event.target.name, false)()
      })
      .catch((error) => {
        console.log(error)
        setNewData({ ...dataUser })
      })
  }

  return (
    <div className='flex-grow w-full '>
      <h2 className='text-3xl text-center'>Datos de Cuenta</h2>

      <div className='flex flex-col-reverse justify-center sm:flex-row gap-2'>
        <div className='mx-4 mt-5 mb-4'>
          <p className='mb-1 mt-2'>Nombre de Usuario:</p>
          <div
            className='w-[40ch] border-2 rounded-lg'
            onTouchStart={changeEdit('username', true)}
            onDoubleClick={changeEdit('username', true)}>
            {!isEdit.username && (
              <p className='p-2 font-bold'>{newData.username}</p>
            )}
            {isEdit.username && (
              <input
                type='text'
                name='username'
                className='p-2 w-full bg-transparent'
                value={newData.username}
                onChange={changeInputText}
                onBlur={updatingDataUser}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    updatingDataUser(event)
                  }
                }}
              />
            )}
          </div>
          <p className='mb-1 mt-2'>Nombre:</p>
          <div
            className='w-[40ch] border-2 rounded-lg'
            onTouchStart={changeEdit('firstname', true)}
            onDoubleClick={changeEdit('firstname', true)}>
            {!isEdit.firstname && (
              <p className='p-2 font-bold'>{newData.firstname}</p>
            )}
            {isEdit.firstname && (
              <input
                type='text'
                name='firstname'
                className='p-2 w-full bg-transparent'
                value={newData.firstname}
                onChange={changeInputText}
                onBlur={updatingDataUser}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    updatingDataUser(event)
                  }
                }}
              />
            )}
          </div>
          <p className='mb-1 mt-2'>Apellido:</p>
          <div
            className='w-[40ch] border-2 rounded-lg'
            onTouchStart={changeEdit('lastname', true)}
            onDoubleClick={changeEdit('lastname', true)}>
            {!isEdit.lastname && (
              <p className='p-2 font-bold'>{newData.lastname}</p>
            )}
            {isEdit.lastname && (
              <input
                type='text'
                name='lastname'
                className='p-2 w-full bg-transparent'
                value={newData.lastname}
                onChange={changeInputText}
                onBlur={updatingDataUser}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    updatingDataUser(event)
                  }
                }}
              />
            )}
          </div>
          <p className='mb-1 mt-2'>Correo Electrónico:</p>
          <div
            className='w-[40ch] border-2 rounded-lg'
            onTouchStart={changeEdit('email', true)}
            onDoubleClick={changeEdit('email', true)}>
            {!isEdit.email && <p className='p-2 font-bold'>{newData.email}</p>}
            {isEdit.email && (
              <input
                type='text'
                name='email'
                className='p-2 w-full bg-transparent'
                value={newData.email}
                onChange={changeInputText}
                onBlur={updatingDataUser}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    updatingDataUser(event)
                  }
                }}
              />
            )}
          </div>
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
