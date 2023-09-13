import { toast } from 'react-toastify'
import { useUserActions } from '../../../hooks/useUserActions'
import useUpdateUserForm from './useUpdateUserForm'
import shortMessage from '../utils/messages'

const useUpdateUserData = ({ schema }) => {
  const { updateInfo, getInfo } = useUserActions()
  const { onSubmit, register, reset } = useUpdateUserForm(
    schema,
    (data) =>
      updateInfo(data)
        .then(() => getInfo(data.id_user))
        .then(() => reset()),
    (dataInvalid) => {
      const message = shortMessage(dataInvalid)
      toast.error(message)
      reset()
    }
  )
  return { onSubmit, register }
}
export default useUpdateUserData
