import { toast } from 'react-toastify'
import { useUserActions } from '../../../hooks/useUserActions'
import useUpdateUserForm from './useUpdateUserForm'
import shortMessage from '../utils/messages'

const useUpdateUserData = ({ schema }) => {
  const { updateInfo, getInfo } = useUserActions()
  const { onSubmit, register } = useUpdateUserForm(
    schema,
    (data) => updateInfo(data).then(() => getInfo(data.id_user)),
    (dataInvalid) => {
      const message = shortMessage(dataInvalid)
      toast.error(message)
    }
  )

  return { onSubmit, register }
}
export default useUpdateUserData
