import UpdateCredentialUser from '../update/UpdateCredentialsUser'
import UpdateNameUser from '../update/UpdateNameUser'
import UpdatePassword from '../update/UpdatePassword'
import ProfileDetailSVG from './ProfileDetailSVG'

const UserUpdateProfile = () => {
  return (
    <section className='flex flex-col md:grid md:grid-cols-2 md:grid-rows-2 gap-10 sm:gap-5 min-w-[30ch] max-w-[80ch]'>
      <UpdateNameUser />
      <UpdateCredentialUser />
      <UpdatePassword />
      <article className='order-first md:order-last mt-5 flex justify-center items-center'>
        <ProfileDetailSVG className='max-w-[10rem]' />
      </article>
    </section>
  )
}
export default UserUpdateProfile
