import Axios from 'axios'

const API_URL = 'http://localhost:8080'

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
    console.log('ERROR: ', error)
    //TODO: Do something with message such as: display notifications...
    //TODO: Dispatch an action...
    return Promise.reject(error.response?.data)
  }
)

export default axiosClient
