import { NavLink } from 'react-router-dom'
import { AppRoutes } from '../../../utils/routes/appRoutes'
import ButtonStyled from '../../buttons/ButtonStyled'

const MenuWithoutLogin = () => {
  return (
    <>
      <NavLink to={AppRoutes.auth.signIn}>
        <ButtonStyled>Iniciar Sesión</ButtonStyled>
      </NavLink>
      <NavLink to={AppRoutes.auth.signUp}>
        <ButtonStyled>Crear Cuenta</ButtonStyled>
      </NavLink>
    </>
  )
}

export default MenuWithoutLogin
