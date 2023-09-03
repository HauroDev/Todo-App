import CrossButton from '../../../../components/CrossButton'
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
        <button
          className='mt-2 block w-full bg-gray-800 rounded p-2 border-b-gray-950 hover:border-b-gray-200 active:border-b-gray-50 border-b-2 active:text-gray-500 active:border-gray-500 hover:bg-gray-500 duration-200'
          onClick={toggleModal}>
          Crear Tarea
        </button>
      )}
    </div>
  )
}

export default CreateTask
