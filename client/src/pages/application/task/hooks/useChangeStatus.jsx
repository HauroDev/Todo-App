import { useState } from 'react'
import { statusSchema } from '../schemas'

const useChangeStatus = (callback) => {
  const [isOpen, setIsOpen] = useState(false)

  const changeStatus = (event) => {
    const statusValid = statusSchema.safeParse(event.target.value)

    callback(statusValid.data)
  }

  const toggleOpen = () => setIsOpen(!isOpen)

  const StatusButton = ({ status, onClick }) => {
    return (
      <button
        onClick={onClick}
        className={`${
          status === 'pending'
            ? 'text-orange-600 border-orange-600'
            : status === 'in progress'
            ? 'text-yellow-600 border-yellow-600'
            : 'text-green-600 border-green-600'
        } border-2 p-1 rounded-lg`}>
        {status}
      </button>
    )
  }

  const StatusButtons = () => (
    <>
      <button
        onClick={changeStatus}
        value='pending'
        className='text-orange-600 border-orange-600 border-2 p-1 rounded-lg'>
        pending
      </button>

      <button
        onClick={changeStatus}
        value='in progress'
        className='text-yellow-600 border-yellow-600 border-2 p-1 rounded-lg'>
        in progress
      </button>

      <button
        onClick={changeStatus}
        value='completed'
        className='text-green-600 border-green-600 border-2 p-1 rounded-lg'>
        completed
      </button>
    </>
  )

  return { isOpen, StatusButtons, toggleOpen, StatusButton }
}

export default useChangeStatus
