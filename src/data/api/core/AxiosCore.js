import axios from 'axios'
import decryptor from './helpers/decryptor'
import logger from './helpers/logger'

class AxiosCore {
  _logger = null
  _decryptor = null

  async request(request) {
    return this._decryptor(this._logger(axios.request(request)))
  }

  useLogger() {
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
