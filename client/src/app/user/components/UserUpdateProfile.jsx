import UpdateCredentialUser from '../update/UpdateCredentialsUser'
import UpdateNameUser from '../update/UpdateNameUser'

const UserUpdateProfile = () => {
  return (
    <div className='mx-4 mt-5 mb-4 max-w-[35ch]'>
      <UpdateNameUser />
      <UpdateCredentialUser />
    </div>
  )
}
export default UserUpdateProfile
