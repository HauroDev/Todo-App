import ButtonStyled from './ButtonStyled'

const SubmitButton = ({ disabled = false, label = '', onClick, ...props }) => {
  return (
    <ButtonStyled
      type='submit'
      disabled={disabled}
      onClick={onClick}
      {...props}>
      {label}
    </ButtonStyled>
  )
}

export default SubmitButton
