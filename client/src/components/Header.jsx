import { NavLink } from 'react-router-dom'
import { AppRoutes } from '../utils/routes/appRoutes'
import { useUserSelector } from '../hooks/store'

const Header = () => {
  const { isSignedIn, dataUser } = useUserSelector((state) => state.user)

  return (
    <header className='flex flex-row justify-between items-center bg-gray-800 text-gray-200 h-16 px-10'>
      <NavLink to={AppRoutes.landing}>
        <h1 className='text-xl sm:text-4xl italic font-bold underline underline-offset-2'>
          Todo-App
        </h1>
      </NavLink>
      <nav>
        {!isSignedIn ? (
          <ul className='flex flex-row'>
            <li className='mx-2 p-1 border-2 rounded-md border-gray-500 hover:bg-gray-600 hover:scale-125 duration-150'>
              <NavLink to={AppRoutes.auth.signIn}>Sign In</NavLink>
            </li>
            <li className='mx-2 p-1 border-2 rounded-md border-gray-500 hover:bg-gray-600 hover:scale-125 duration-150'>
              <NavLink to={AppRoutes.auth.signUp}>Sign Up</NavLink>
            </li>
          </ul>
        ) : (
          <p> {`¡Bienvenido ${dataUser.firstname} ${dataUser.lastname}!`}</p>
        )}
      </nav>
    </header>
  )
}

export default Header
