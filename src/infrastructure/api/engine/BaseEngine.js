import delay from './delay'

class BaseEngine {
  maxRetries = 12 // Số lần tối đa retry
  msBackoff = 100 // Thời gian trong mỗi lần retry (ms)
  REQUEST_INIT_DEFAULTS = {
    // Set các thông số ban đầu cho request
    credentials: 'include',
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }
  RETRYABLE_ERRORS = [408, 500, 502, 503, 504] // Các mã lỗi có thể retry
  getHeaders = null // Định nghĩa hàm get headers

  //Response trả về lỗi network.
  NETWORK_ERROR = {
    statusCode: 500,
    contentType: 'text/plain',
    body: 'Network error',
  }

  constructor(options = {}) {
    if (typeof options.maxRetries === 'number') {
      this.maxRetries = options.maxRetries
    }

    if (typeof options.msBackoff === 'number') {
      this.msBackoff = options.msBackoff
    }

    if (options.getHeaders) {
      this.getHeaders = options.getHeaders
    }
  }

  requestImpl = async (rqInit) => {
    const { url, shouldRetry, ...rqInitparams } = rqInit
    const requestInit = {
      ...this.REQUEST_INIT_DEFAULTS,
      ...rqInitparams,

      headers: new Headers({
        ...this.REQUEST_INIT_DEFAULTS.headers,
        ...(this.getHeaders() || {}),
        ...(rqInitparams.headers || {}),
      }),
    }

    const request = new Request(url, requestInit)

    const response = await this.requestWithRetries(
      request,
      shouldRetry ? this.maxRetries : 0,
      this.msBackoff
    )

    return response
  }

  requestWithRetries = async (request, retries, msBackoff) => {
    const response = await this.fromRawResponse(await this.tryRequest(request))

    if (response.success) {
      return response
    } else if (
      //Kiểm tra xem có retry được hay không
      retries > 0 &&
      this.RETRYABLE_ERRORS.includes(response.statusCode)
    ) {
      //Trì hoãn theo thuật toán expotional backoff
      await delay(msBackoff)

      return this.requestWithRetries(request, retries - 1, msBackoff * 2)
    } else {
      //Trả về thẳng cái lỗi luôn
      return response
    }
  }

  //Cần dùng hàm này để parse cái response về đúng chuẩn
  //response của mình.
  //Có thể trả về lỗi luôn, lỗi này sẽ bao gồm cả: Error, (bởi
  //vì error cũng là một response mà!!!)
  fromRawResponse({ statusCode, body, contentType }) {
    let data = null,
      error = null

    if (contentType && contentType.includes('json')) {
      try {
        data = JSON.parse(body)
      } catch (err) {
        error = this.createError(400, 'Can not parse response!')
      }
    }

    if (statusCode < 200 || statusCode >= 300) {
      error = this.createError(statusCode, data.message)
    }

    if (error) {
      return error
    } else if (data) {
      return this.createSuccess(data)
    } else {
      return this.createError(400, `Response wasn'tt JSON`)
    }
  }

  //Hàm sẽ dùng để thực hiện request để lấy về response đem
  //nhét vào fromRawResponse.
  tryRequest = async (request) => {}

  //Build kết quả thành công.
  createSuccess(response) {
    return {
      success: true,
      data: response,
    }
  }

  //Build error phía client để trả về.
  createError(statusCode, message) {
    const error = new Error(`API Error: ${message}`)

    error.originalMessage = message
    error.statusCode = statusCode
    error.success = false

    return error
  }

  checkNetworkConnect = async () => {
    try {
      const online = await fetch('/img1x1.png')
      return online.status >= 200 && online.status < 300
    } catch (err) {
      return false
    }
  }
}

export default BaseEngine
