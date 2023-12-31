import axios from 'axios'

const updateHeader = (request) => {
  const token = JSON.parse(localStorage.getItem('__todoapp__state__'))?.user
    ?.token
  if (token) {
    const newHeaders = {
      Authorization: `Bearer ${token}`
    }

    request.headers = newHeaders
  }
  return request
}

export const PrivateInterceptor = () => {
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
