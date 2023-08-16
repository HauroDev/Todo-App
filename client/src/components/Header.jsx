import { NavLink } from 'react-router-dom'
import { routerName } from '../utils/routes'

const Header = () => {
  return (
    <header className='flex flex-row justify-between items-center bg-gray-800 text-gray-200 h-16 px-10'>
      <h1 className='text-xl sm:text-4xl italic font-bold underline underline-offset-2'>
        Todo-App
      </h1>
      <nav>
        <ul className='flex flex-row'>
          <li className='mx-2 p-1 border-2 rounded-md border-gray-500 hover:bg-gray-600 hover:scale-125 duration-150'>
            <NavLink to={routerName.login}>Login</NavLink>
          </li>
          <li className='mx-2 p-1 border-2 rounded-md border-gray-500 hover:bg-gray-600 hover:scale-125 duration-150'>
            <NavLink to={routerName.register}>Register</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
