import axios from 'axios'
import { access } from '../utils/routes/apiRoutes'

export const userAccessRequest = async (credentials) => {
  const urlLogin = access.login + '?' + new URLSearchParams(credentials)

  try {
    const { data: info } = await axios.get(urlLogin)

    return info
  } catch (error) {
    return null
  }
}
