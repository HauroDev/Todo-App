import ButtonStyled from '../../../components/buttons/ButtonStyled'
import CrossButton from '../../../components/buttons/CrossButton'
import useModal from '../../../hooks/useModal'
import FormTask from './FormTask'

const CreateTask = () => {
  const { ModalContainer, toggleModal } = useModal()

  return (
    <div className='flex flex-col justify-center items-center my-3 max-w-fit'>
      <ModalContainer>
        <div className='flex justify-between items-center'>
          <h4 className='text-4xl font-bold italic'>Formulario</h4>
          <CrossButton onClick={toggleModal} />
        </div>
        <FormTask callback={toggleModal} />
      </ModalContainer>

      <ButtonStyled onClick={toggleModal}>Crear Tarea</ButtonStyled>
    </div>
  )
}

export default CreateTask
