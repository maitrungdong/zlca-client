import Axios from 'axios'
import { serverBaseURLs } from '@utils/constants.js'

const axiosClient = Axios.create({
  baseURL: serverBaseURLs.API,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.request.use(
  function (config) {
    //Do something before request is sent
    return config
  },
  function (error) {
    //Do something with request error
    return Promise.reject(error)
  }
)
axiosClient.interceptors.response.use(
  (response) => {
    //Do something before getting response
    return response.data
  },
  (error) => {
    //Do something before getting response error
    return error.response?.data
  }
)

export default axiosClient
