import axios, { AxiosError } from 'axios'
import { access } from '../utils/routes/apiRoutes'

export const loginRequest = async (credentials) => {
  const urlLogin = access.login + '?' + new URLSearchParams(credentials)

  try {
    const { data } = await axios.get(urlLogin)

    return data
  } catch (error) {
    if (error instanceof AxiosError)
      throw new Error(error.response.data.message)

    throw new Error('connection error: ' + error.message)
  }
}

export const registerRequest = async (information) => {
  try {
    const { data } = await axios.post(access.register, information)

    return data
  } catch (error) {
    if (error instanceof AxiosError)
      throw new Error(error.response.data.message)

    throw new Error('connection error: ' + error.message)
  }
}
