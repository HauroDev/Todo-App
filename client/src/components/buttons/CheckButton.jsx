import ButtonStyled from './ButtonStyled'
import CheckMark from '../../icons/CheckMark'

const CheckButton = ({ ...props }) => {
  return (
    <ButtonStyled
      className='max-w-fit'
      {...props}>
      <CheckMark />
    </ButtonStyled>
  )
}

export default CheckButton
