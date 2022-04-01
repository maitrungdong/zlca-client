import Axios from 'axios'

const API_URL = 'http://localhost:8080'

function authRequestInterceptor(config) {
  const token = 'fake)9fdfhkfdhg-asđsfljlZQ-token' //storage.getToken()
  if (token) {
    config.headers.authorization = `Brearer ${token}`
  }
  config.headers.Accept = 'application/json'
  return config
}

const axiosClient = Axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.request.use(
  function (config) {
    //Do something before request is sent
    //TODO: Dispatch an action...
    //TODO: Attach JWToken...
    // config = authRequestInterceptor(config)
    return config
  },
  function (error) {
    //Do something with request error
    //TODO: Dispatch an action...
    return Promise.reject(error)
  }
)
axiosClient.interceptors.response.use(
  (response) => {
    //TODO: Dispatch an action...
    return response.data
  },
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Oops! Some errors happened, please try again!'
    //TODO: Do something with message such as: display notifications...
    //TODO: Dispatch an action...
    return error.response?.data
  }
)

export default axiosClient
