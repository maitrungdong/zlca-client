import BaseError from './BaseError.js'
import { errorCodes } from 'utils/constants.js'

class BadRequestError extends BaseError {
  constructor(
    message = 'API: Bad request!',
    data,
    statusCode = errorCodes.BAD_REQUEST,
    name = 'BadRequestError'
  ) {
    super(name, message, statusCode, data)
  }
}

export default BadRequestError
