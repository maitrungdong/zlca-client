import axios from 'axios'
import delay from './helpers/delay.js'

class AxiosEngine {
  NETWORK_ERROR = {
    statusCode: 999,
    contentType: 'application/json',
    body: {
      success: false,
      data: null,
      message: 'Lỗi kết nối mạng! Vui lòng thử lại sau.',
    },
  }

  /**
   * Peform a request with requestInit, retryOptions args.
   *
   * @param {object} rqInit request config
   * @param {object} retrySchemas retry schemas
   * @returns một response hoặc throw error
   */
  request = async (request, retrySchemas) => {
    //TODO: performs a first request.
    let response = this._standardResponse(await this._tryRequest(request))
    if (response.success) return response
    if (!retrySchemas) throw response

    //Nếu như có retry schema thì mình sẽ bắt đầu thực hiện retry!
    const usedRetrySchema = Array.isArray(retrySchemas)
      ? {
          ...retrySchemas.find((rtSchm) =>
            rtSchm.errorCodes.includes(response.statusCode)
          ),
        }
      : { ...retrySchemas }

    response = await this._requestWithRetries(request, usedRetrySchema)

    if (response.success) return response
    throw response
  }

  _tryRequest = async (request) => {
    let response = null
    try {
      response = await axios.request(request)
      return {
        statusCode: response.status,
        body: response.data,
      }
    } catch (err) {
      console.log(JSON.stringify(err, null, 4))
      return this.NETWORK_ERROR
    }
  }

  _requestWithRetries = async (request, usedRetrySchema) => {
    const stack = []
    stack.push(usedRetrySchema)

    while (stack.length > 0) {
      const retrySchema = stack.pop()

      const response = this._standardResponse(await this._tryRequest(request))
      if (
        !response.success &&
        !request.signal.aborted &&
        retrySchema.maxRetries > 0 &&
        retrySchema.errorCodes.includes(response.statusCode)
      ) {
        await delay(retrySchema.msBackoff)

        stack.push({
          ...retrySchema,
          maxRetries: --retrySchema.maxRetries,
          msBackoff: 2 * retrySchema.msBackoff,
        })
      } else {
        return response
      }
    }
  }

  _standardResponse = ({ statusCode, body }) => {
    const data = body
    let error = null

    if (statusCode < 200 || statusCode >= 300) {
      if (data?.success === false) {
        error = this._createError(statusCode, data.message)
      } else {
        error = this._createError(statusCode, data)
      }
    }

    if (error) {
      return error
    } else {
      return this._createSuccess(data)
    }
  }

  _createSuccess(response) {
    return {
      success: response.success,
      data: response.data,
      message: response.message,
    }
  }

  _createError(statusCode, message) {
    const error = new Error(`API Error: ${message}`)

    error.success = false
    error.statusCode = statusCode
    error.originalMessage = message

    return error
  }
}

export default AxiosEngine
