import { useState } from 'react'

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = () => setIsOpen(!isOpen)

  const ModalContainer = ({ children }) =>
    isOpen && (
      <div className='fixed top-0 left-0 z-50 h-full flex bg-[rgba(0,0,0,0.3)] flex-col justify-center items-center w-full'>
        <article className='relative bg-gray-800 p-4 m-4 w-[80%] lg:w-[40%] rounded-lg'>
          {children}
        </article>
      </div>
    )

  return { ModalContainer, toggleModal, isOpen }
}

export default useModal
