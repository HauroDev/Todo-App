import ButtonStyled from './ButtonStyled'

const SubmitButton = ({ disabled = false, label = '' }) => {
  return (
    <ButtonStyled
      type='submit'
      disabled={disabled}>
      {label}
    </ButtonStyled>
  )
}

export default SubmitButton
