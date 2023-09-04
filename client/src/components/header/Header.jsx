import { NavLink } from 'react-router-dom'
import { AppRoutes } from '../../utils/routes/appRoutes'
import MenuWithoutLogin from './menus/MenuWithoutLogin'
import MenuWithLogin from './menus/MenuWithLogin'
import { useUserSelector } from '../../hooks/store'

const Header = () => {
  const { isSignedIn } = useUserSelector()

  return (
    <header className='flex flex-row justify-between items-center bg-gray-900 text-gray-200 h-16 px-2'>
      <NavLink to={AppRoutes.landing}>
        <h1 className='text-xl sm:text-4xl italic font-bold underline underline-offset-2 hover:text-gray-400 duration-200'>
          Todo-App
        </h1>
      </NavLink>
      <nav className='flex flex-row gap-2 justify-center items-center'>
        {!isSignedIn ? <MenuWithoutLogin /> : <MenuWithLogin />}
      </nav>
    </header>
  )
}

export default Header
