import { AppRoutes } from '../../../utils/routers/app'
import LogoutButton from './LogoutButton'
import LinkButton from '../../buttons/LinkButton'

const AccessLinks = () => (
  <>
    <LinkButton to={AppRoutes.home.base}>Principal</LinkButton>
    <LinkButton to={AppRoutes.home.tasks.base}>Tareas</LinkButton>
    <LinkButton to={AppRoutes.home.profile.base}>Cuenta</LinkButton>
    <LogoutButton />
  </>
)

export default AccessLinks
