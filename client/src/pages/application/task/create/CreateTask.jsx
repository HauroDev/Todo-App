import useModal from '../../../../hooks/useModal'

import CrossMark from '../icons/CrossMark'
import FormTask from './FormTask'

const CreateTask = () => {
  const { ModalContainer, toggleModal, isOpen } = useModal()

  return (
    <div className='my-3'>
      <ModalContainer>
        <div className='flex justify-between items-center'>
          <h4>Formulario</h4>
          <button
            type='button'
            className='mt-2 block w-fit bg-gray-800 rounded p-1 border-b-gray-950 hover:border-b-gray-200 active:border-b-gray-50 border-b-2 active:text-gray-500 active:border-gray-500 hover:bg-gray-500 duration-200 disabled:bg-gray-400 disabled:hover:border-b-gray-950 disabled:active:text-red-400'
            onClick={toggleModal}>
            <CrossMark />
          </button>
        </div>
        <FormTask callback={toggleModal} />
      </ModalContainer>

      {!isOpen && (
        <button
          className='mt-2 block w-full bg-gray-800 rounded p-2 border-b-gray-950 hover:border-b-gray-200 active:border-b-gray-50 border-b-2 active:text-gray-500 active:border-gray-500 hover:bg-gray-500 duration-200 disabled:bg-gray-400 disabled:hover:border-b-gray-950 disabled:active:text-red-400'
          onClick={toggleModal}>
          Crear Tarea
        </button>
      )}
    </div>
  )
}

export default CreateTask
