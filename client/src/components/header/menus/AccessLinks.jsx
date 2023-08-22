import { NavLink } from 'react-router-dom'
import { AppRoutes } from '../../../utils/routes/appRoutes'
import LogoutButton from './LogoutButton'

const AccessLinks = () => (
  <>
    <NavLink
      className='block w-full rounded p-1 border-b-gray-950 hover:border-b-gray-200 active:border-b-gray-50 border-b-2 active:text-gray-500 active:border-gray-500 hover:bg-gray-600 duration-200'
      to={AppRoutes.home.base}>
      Principal
    </NavLink>
    <NavLink
      className='block w-full rounded p-1 border-b-gray-950 hover:border-b-gray-200 active:border-b-gray-50 border-b-2 active:text-gray-500 active:border-gray-500 hover:bg-gray-600 duration-200'
      to={AppRoutes.home.formTask}>
      Tareas
    </NavLink>
    <NavLink
      className='block w-full rounded p-1 border-b-gray-950 hover:border-b-gray-200 active:border-b-gray-50 border-b-2 active:text-gray-500 active:border-gray-500 hover:bg-gray-600 duration-200'
      to={AppRoutes.profile.edit}>
      Cuenta
    </NavLink>
    <LogoutButton />
  </>
)

export default AccessLinks
