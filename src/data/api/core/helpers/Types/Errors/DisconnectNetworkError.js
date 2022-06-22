import BaseError from './BaseError.js'
import { errorCodes } from 'utils/constants.js'
class DisconnectNetworkError extends BaseError {
  constructor(
    message = 'Network is disconnect!',
    data,
    statusCode = errorCodes.DISNETWORK_ERROR,
    name = 'DisconnectNetworkError'
  ) {
    super(name, message, statusCode, data)
  }
}

export default DisconnectNetworkError
