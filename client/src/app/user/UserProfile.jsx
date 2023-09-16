import UserUpdateProfile from './components/UserUpdateProfile'

const UserProfile = () => {
  return (
    <section className='bg-gray-600 rounded p-5 m-2 sm:mb-auto'>
      <article>
        <h2 className='text-3xl'>Datos de Cuenta</h2>
        <p className='text-xl'>Aquí puedes actualizar tus datos</p>
      </article>
      <UserUpdateProfile />
    </section>
  )
}

export default UserProfile
