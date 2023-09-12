import ButtonStyled from './ButtonStyled'

const SubmitButton = ({ disabled = false, label = '', onClick }) => {
  return (
    <ButtonStyled
      type='submit'
      disabled={disabled}
      onClick={onClick}>
      {label}
    </ButtonStyled>
  )
}

export default SubmitButton
