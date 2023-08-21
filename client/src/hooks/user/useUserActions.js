import axios from 'axios'
import { signIn, signOut, signUp } from '../../store/slices/userSlice'
import { useUserDispatch } from '../store'
import { ApiRoutes } from '../../utils/routes/apiRoutes'

export const useUserActions = () => {
  const dispatch = useUserDispatch()

  const loginUser = async (credentials) => {
    const urlLogin =
      ApiRoutes.user.signIn + '?' + new URLSearchParams(credentials)
    try {
      const { data } = await axios.get(urlLogin)
      const { token, dataUser } = data

      dispatch(signIn({ token, dataUser }))
    } catch (error) {
      throw new Error('connection error: ' + error.message)
    }
  }

  const logoutUser = () => dispatch(signOut())

  const registerUser = async (information) => {
    try {
      const { data } = await axios.post(ApiRoutes.user.signUp, information)

      dispatch(signUp(data))
    } catch (error) {
      throw new Error('connection error: ' + error.message)
    }
  }

  return { loginUser, logoutUser, registerUser }
}
