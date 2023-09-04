import ButtonStyled from '../../../../components/buttons/ButtonStyled'
import CrossButton from '../../../../components/buttons/CrossButton'
import useModal from '../../../../hooks/useModal'

import FormTask from './FormTask'

const CreateTask = () => {
  const { ModalContainer, toggleModal, isOpen } = useModal()

  return (
    <div className='my-3'>
      <ModalContainer>
        <div className='flex justify-between items-center'>
          <h4>Formulario</h4>
          <CrossButton onClick={toggleModal} />
        </div>
        <FormTask callback={toggleModal} />
      </ModalContainer>

      {!isOpen && (
        <ButtonStyled onClick={toggleModal}>Crear Tarea</ButtonStyled>
      )}
    </div>
  )
}

export default CreateTask
