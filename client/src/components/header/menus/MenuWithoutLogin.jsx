import { NavLink } from 'react-router-dom'
import { AppRoutes } from '../../../utils/routes/appRoutes'

const MenuWithoutLogin = () => {
  return (
    <>
      <NavLink
        className='w-full p-1 border-2 rounded-md active:text-gray-500 active:border-gray-500 hover:bg-gray-600 duration-200'
        to={AppRoutes.auth.signIn}>
        Sign In
      </NavLink>
      <NavLink
        className='w-full p-1 border-2 rounded-md active:text-gray-500 active:border-gray-500 hover:bg-gray-600 duration-200'
        to={AppRoutes.auth.signUp}>
        Sign Up
      </NavLink>
    </>
  )
}

export default MenuWithoutLogin
