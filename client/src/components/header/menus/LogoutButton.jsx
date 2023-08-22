import { useNavigate } from 'react-router-dom'
import { useUserActions } from '../../../hooks/useUserActions'
import { AppRoutes } from '../../../utils/routes/appRoutes'

const LogoutButton = () => {
  const { logoutUser } = useUserActions()

  const navigate = useNavigate()
  const redirectTo = async () => {
    try {
      await logoutUser()

      navigate(AppRoutes.landing)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  return (
    <button
      className='text-left block w-full rounded p-1 border-b-gray-950 hover:border-b-gray-200 active:border-b-gray-50 border-b-2 active:text-gray-500 active:border-gray-500 hover:bg-gray-600 duration-200'
      onClick={redirectTo}>
      Salir
    </button>
  )
}

export default LogoutButton
