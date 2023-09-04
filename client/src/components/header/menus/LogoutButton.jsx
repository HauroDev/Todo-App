import { useNavigate } from 'react-router-dom'

import { useUserActions } from '../../../hooks/useUserActions'
import { AppRoutes } from '../../../utils/routes/appRoutes'
import ButtonStyled from '../../buttons/ButtonStyled'

const LogoutButton = () => {
  const { logoutUser } = useUserActions()

  const navigate = useNavigate()
  const redirectTo = () =>
    logoutUser()
      .then(() => navigate(AppRoutes.landing))
      .catch((error) => console.log(error))

  return <ButtonStyled onClick={redirectTo}>Cerrar Sesión</ButtonStyled>
}

export default LogoutButton
