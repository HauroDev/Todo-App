import { useState } from 'react'
import { statusSchema } from '../utils/schemas'
import StatusButtons from '../components/status/StatusButtons'
import StatusButton from '../components/status/StatusButton'

const useOpen = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => setIsOpen(!isOpen)

  return { isOpen, toggleOpen }
}

const useChangeStatus = (
  initialStatus,
  callback = (state) => console.log(state)
) => {
  const { isOpen, toggleOpen } = useOpen()

  const [status, setStatus] = useState(initialStatus)
  const changeStatus = ({ target: { value } }) => {
    const statusValid = statusSchema.safeParse(value)

    if (statusValid.success) {
      setStatus(statusValid.data)
      callback(statusValid.data)
      toggleOpen()
    }
  }

  return {
    isOpen,
    StatusButtons: StatusButtons({ changeStatus }),
    toggleOpen,
    StatusButton: StatusButton({ toggleOpen, status })
  }
}

export default useChangeStatus
