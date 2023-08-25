import axios from 'axios'

export const PrivateInterceptor = () => {
  const updateHeader = (request) => {
    const { token } = JSON.parse(
      localStorage.getItem('__todoapp__state__')
    ).user
    const newHeaders = {
      Authorization: `Bearer ${token}`
    }

    request.headers = newHeaders
    return request
  }

  axios.interceptors.request.use(
    (request) => {
      return updateHeader(request)
    },
    (error) => {
      console.log(error)
    }
  )

  axios.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      console.log(error)
      return Promise.reject(error)
    }
  )
}
