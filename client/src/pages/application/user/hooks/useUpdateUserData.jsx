import { toast } from 'react-toastify'
import { useUserActions } from '../../../../hooks/useUserActions'
import useUpdateUserForm from './useUpdateUserForm'

const shortMessage = (data = {}) =>
  'Error: ' +
  Object.entries(data)
    .map(([property, value]) => `${property}: ${value.message}`)
    .join('\n')

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
    }
  )
  return { onSubmit, register }
}
export default useUpdateUserData
