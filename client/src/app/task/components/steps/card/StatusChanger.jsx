import useChangeStatus from '../../../hooks/useChangeStatus'

const StatusChanger = ({ initialValue, onChange }) => {
  const { isOpen, StatusButton, StatusButtons } = useChangeStatus(
    initialValue,
    onChange
  )

  return (
    <>
      {isOpen && <StatusButtons />}
      {!isOpen && <StatusButton />}
    </>
  )
}

export default StatusChanger
