import ProfileDetailSVG from './components/ProfileDetailSVG'
import UserUpdateProfile from './components/UserUpdateProfile'

const UserProfile = () => {
  return (
    <>
      <div className='text-center'>
        <h2 className='text-3xl'>Datos de Cuenta</h2>
        <p className='text-xl'>Aquí puedes actualizar tus datos</p>
      </div>
      <div className='flex flex-col-reverse justify-center sm:flex-row gap-10'>
        <UserUpdateProfile />
        <ProfileDetailSVG className='w-72' />
      </div>
    </>
  )
}

export default UserProfile
