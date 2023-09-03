import axios from 'axios'
import * as User from '../store/slices/userSlice'
import { useUserDispatch } from './store'
import { ApiRoutes } from '../utils/routes/apiRoutes'
import { toast } from 'react-toastify'

export const useUserActions = () => {
  const dispatch = useUserDispatch()

  const loginUser = async (credentials) => {
    const urlLogin = ApiRoutes.signIn + '?' + new URLSearchParams(credentials)
    try {
      const { data } = await axios.get(urlLogin)
      const { dataUser, token } = data

      dispatch(User.signIn({ dataUser, token }))

      toast.success('Sesión Iniciada Correctamente')
    } catch (error) {
      toast.error('Problema de Conexión')
      throw error
    }
  }

  const logoutUser = async () => {
    try {
      await axios.get(ApiRoutes.signOut)

      dispatch(User.signOut())

      toast.success('Sesión Finalizada Correctamente')
    } catch (error) {
      toast.error('Problema de Conexión')
      throw error
    }
  }

  const registerUser = async (info) => {
    try {
      const { data } = await axios.post(ApiRoutes.signUp, info)
      dispatch(User.signUp(data))
      toast.success('Registro e Inicio de Sesión completado')
    } catch (error) {
      toast.error('Problema de Conexión')
      throw error
    }
  }

  const updateInfo = async (info) => {
    const updateUrl = `${ApiRoutes.user.update}/${info.id_user}`

    try {
      const { data } = await axios.put(updateUrl, info)

      dispatch(User.update(data))
      toast.success('Datos de Usuario Actualizados Correctamente')
    } catch (error) {
      toast.error('Problema de Conexión')
      throw error
    }
  }

  return { loginUser, logoutUser, registerUser, updateInfo }
}
