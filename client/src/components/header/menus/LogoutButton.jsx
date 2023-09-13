import { useNavigate } from 'react-router-dom'

import { useUserActions } from '../../../hooks/useUserActions'
import { AppRoutes } from '../../../utils/routers/app'
import ButtonStyled from '../../buttons/ButtonStyled'
import useTaskActions from '../../../hooks/useTaskActions'

const LogoutButton = () => {
  const { logoutUser } = useUserActions()
  const { clearTaskDetail, clearTasks, clearTasksDeleted } = useTaskActions()

  const navigate = useNavigate()
  const redirectTo = () =>
    logoutUser()
      .then(() => navigate(AppRoutes.landing))
      .then(() =>
        Promise.all([clearTaskDetail(), clearTasks(), clearTasksDeleted()])
      )
      .catch((error) => console.log(error))

  return <ButtonStyled onClick={redirectTo}>Cerrar Sesión</ButtonStyled>
}

export default LogoutButton
