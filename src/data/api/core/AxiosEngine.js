import axios from 'axios'
import delay from './delay.js'

class AxiosEngine {
  //Default options setting:
  options = {
    maxRetries: 5,
    msBackoff: 100,
    shouldRetry: true,
    retryableErrors: [408, 500, 502, 503, 504],
  }

  NETWORK_ERROR = {
    statusCode: 999,
    contentType: 'application/json',
    body: {
      success: false,
      data: null,
      message: 'Lỗi kết nối mạng! Vui lòng thử lại sau.',
    },
  }

  constructor(options = {}) {
    this._configOptions(options)
  }

  _configOptions = (options = {}) => {
    if (typeof options.maxRetries === 'number') {
      this.options.maxRetries = options.maxRetries
    }

    if (typeof options.shouldRetry === 'boolean') {
      this.options.shouldRetry = options.shouldRetry
    }

    if (typeof options.msBackoff === 'number') {
      this.options.msBackoff = options.msBackoff
    }

    if (Array.isArray(options.retryableErrors)) {
      this.options.retryableErrors = [...options.retryableErrors]
    }
  }

  /**
   *
   * @param {object} rqInit cấu hình của một request.
   * @param {object} rtOptions cấu hình của retry strategy.
   * @returns một response hoặc throw error
   */
  request = async (rqInit, rtOptions) => {
    const { url, signal, ...rqInitParams } = rqInit

    const retryOptions = {
      maxRetries: rtOptions.maxRetries || this.options.maxRetries,
      shouldRetry: rtOptions.shouldRetry || this.options.shouldRetry,
      msBackoff: rtOptions.msBackoff || this.options.msBackoff,
      retryableErrors:
        rtOptions.retryableErrors || this.options.retryableErrors,
    }

    const requestInit = {
      ...rqInitParams,
      signal,
      headers: {
        ...(rqInitParams.headers || {}),
      },
    }

    const request = {
      url: url.toString(),
      ...requestInit,
    }

    const response = await this._requestWithRetries(
      request,
      retryOptions.shouldRetry ? retryOptions.maxRetries : 0,
      retryOptions.msBackoff,
      retryOptions.retryableErrors
    )

    if (response.success) {
      return response
    } else {
      throw response
    }
  }

  _tryRequest = async (request) => {
    let response = null
    try {
      // debugger
      response = await axios.request(request)
      return {
        statusCode: response.status,
        body: response.data,
      }
    } catch (err) {
      // debugger
      console.log(JSON.stringify(err, null, 4))
      return this.NETWORK_ERROR
    }
  }

  _requestWithRetries = async (
    request,
    retries,
    msBackoff,
    retryableErrors
  ) => {
    console.log(
      '_requestWithRetries',
      request,
      retries,
      msBackoff,
      retryableErrors
    )
    const response = this._standardResponse(await this._tryRequest(request))
    // debugger
    if (
      !response.success &&
      !request?.signal?.aborted &&
      retries > 0 &&
      retryableErrors.includes(response.statusCode)
    ) {
      await delay(msBackoff)

      return this._requestWithRetries(
        request,
        retries - 1,
        msBackoff * 2,
        retryableErrors
      )
    } else {
      return response
    }
  }

  _standardResponse = ({ statusCode, body }) => {
    // debugger
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
