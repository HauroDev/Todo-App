import UpdateCredentialUser from '../update/UpdateCredentialsUser'
import UpdateNameUser from '../update/UpdateNameUser'
import UpdatePassword from '../update/UpdatePassword'
import ProfileDetailSVG from './ProfileDetailSVG'

const UserUpdateProfile = () => {
  return (
    <div className='flex flex-col md:grid md:grid-cols-2 md:grid-rows-2 gap-10 sm:gap-5 min-w-[30ch] max-w-[80ch]'>
      <UpdateNameUser />
      <UpdateCredentialUser />
      <UpdatePassword />
      <div className='order-first sm:order-last mt-10 flex justify-center items-center'>
        <ProfileDetailSVG className='max-w-[10rem]' />
      </div>
    </div>
  )
}
export default UserUpdateProfile
