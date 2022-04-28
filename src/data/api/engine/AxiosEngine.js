import BaseEngine from './BaseEngine.js'
import axios from 'axios'

class AxiosEngine extends BaseEngine {
  tryRequest = async (request) => {
    let response = null

    try {
      response = await axios.request(request)
      console.log({ RESPONSE_RAW_AXIOS: response })

      const contentType = response.headers.get('content-type')

      return {
        statusCode: response.status,
        contentType,
        body: response.data,
      }
    } catch (err) {
      console.log('NETWORK_ERROR, we should do again!')
      console.log({ err })
      //Thất bại bởi vì vấn đề về network...
      return this.NETWORK_ERROR
    }
  }
}

export default AxiosEngine
