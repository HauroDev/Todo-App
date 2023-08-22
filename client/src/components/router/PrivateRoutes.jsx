import { Navigate, Outlet } from 'react-router-dom'
import { AppRoutes } from '../../utils/routes/appRoutes'

const PrivateRoutes = ({
  children,
  redirectTo = AppRoutes.landing,
  authorized
}) => {
  if (!authorized) {
    return (
      <Navigate
        to={redirectTo}
        replace={true}
      />
    )
  }

  return children || <Outlet />
}

export default PrivateRoutes
