import { NavLink } from 'react-router-dom'
import { AppRoutes } from '../../../utils/routes/appRoutes'
import LogoutButton from './LogoutButton'
import ButtonStyled from '../../buttons/ButtonStyled'

const LinkButton = ({ to, children }) => (
  <NavLink to={to}>
    <ButtonStyled>{children}</ButtonStyled>
  </NavLink>
)

const AccessLinks = () => (
  <>
    <LinkButton to={AppRoutes.home.base}>Principal</LinkButton>
    <LinkButton to={AppRoutes.home.Tasks}>Tareas</LinkButton>
    <LinkButton to={AppRoutes.home.profile.base}>Cuenta</LinkButton>
    <LogoutButton />
  </>
)

export default AccessLinks
