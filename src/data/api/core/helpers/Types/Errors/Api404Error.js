import { errorCodes } from 'utils/constants.js'
import BaseError from './BaseError.js'

class Api404Error extends BaseError {
  constructor(
    message = 'API: Not found!',
    data,
    statusCode = errorCodes.NOT_FOUND,
    name = 'Api404Error'
  ) {
    super(name, statusCode, message, data)
  }
}

export default Api404Error
