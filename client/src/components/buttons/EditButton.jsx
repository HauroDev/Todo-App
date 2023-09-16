import PencilIcon from '../../icons/PencilIcon'
import ButtonStyled from './ButtonStyled'

const EditButton = (props) => {
  return (
    <ButtonStyled
      className='max-w-fit'
      {...props}>
      <PencilIcon />
    </ButtonStyled>
  )
}

export default EditButton
