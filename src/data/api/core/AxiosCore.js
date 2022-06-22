import axios from 'axios'
import decryptor from './helpers/decryptor'
import logger from './helpers/logger'

class AxiosCore {
  _logger = null
  _decryptor = null

  async request(request) {
    const response = await axios.request(request)
    const decryptedRes = this._decryptor(response)
    this._logger.log(request)(decryptedRes)

    return decryptedRes
  }

  useLogger(logger) {
    this._logger = logger
  }

  useDecryptor(decryptor) {
    this._decryptor = decryptor
  }
}

const axiosCore = new AxiosCore()
axiosCore.useLogger(logger)
axiosCore.useDecryptor(decryptor)

export default axiosCore
