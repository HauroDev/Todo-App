import { NavLink } from 'react-router-dom'
import ButtonStyled from './ButtonStyled'

const LinkButton = ({ to, children }) => (
  <NavLink to={to}>
    <ButtonStyled>{children}</ButtonStyled>
  </NavLink>
)
export default LinkButton
