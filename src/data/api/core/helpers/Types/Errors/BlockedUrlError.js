import BaseError from './BaseError.js'
import { errorCodes } from 'utils/constants.js'

class BlockedUrlError extends BaseError {
  constructor(
    message = 'This URL is blocked!',
    data,
    statusCode = errorCodes.BLOCKED_URL,
    name = 'BlockedUrlError'
  ) {
    super(name, message, statusCode, data)
  }
}

export default BlockedUrlError
