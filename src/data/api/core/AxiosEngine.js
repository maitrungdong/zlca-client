import axios from 'axios'
import decryptor from './helpers/decryptor.js'
import delay from './helpers/delay.js'
import logger from './helpers/logger.js'
import Deferer from './helpers/Deferer.js'
import { isEmptyObj } from 'utils/checks.js'

class AxiosEngine {
  //Network_error: mã lỗi trả về khi kết nối mạng không thành công.
  NETWORK_ERROR = {
    statusCode: 999,
    contentType: 'application/json',
    body: {
      success: false,
      data: null,
      message: 'Lỗi kết nối mạng! Vui lòng thử lại sau.',
    },
  }

  _waitRequests = []

  _decryptor = null
  _logger = null
  init(decryptor) {
    return (logger) => {
      this._decryptor = decryptor
      this._logger = logger
    }
  }

  _timeToClearWaitRequest = 60 * 60 * 1000 // an hour
  _networkStatusListener = null
  _isOnline = true

  constructor() {
    this._networkStatusListener = (isOnline) => {
      if (!this._isOnline && isOnline) {
        this._waitRequests.forEach((wr) => wr.deferer?.cancelDelay())
      }
      this._isOnline = isOnline
    }

    window.ZlcaDetectNetwork.addEventListener(
      'change',
      this._networkStatusListener
    )

    //TODO: set interval to clear waitRequest if it expire.
    setInterval(this._clearWaitRequests, this._timeToClearWaitRequest)
  }

  request = async (request, retrySchemas, waitNetworkConfig) => {
    //STEP01: thực hiện request đầu tiên để kiểm tra xem mình cần dùng retrySchema nào
    //dựa trên mã lỗi.
    let response = this._standardResponse(await this._tryRequest(request))
    if (response.success) return response

    //STEP02: nếu không thành công thì sẽ đi tìm một retrySchema phù hợp để retry.
    //Nếu không có thì throw response
    const retrySchema = Array.isArray(retrySchemas)
      ? {
          ...retrySchemas.find((rtSchm) =>
            rtSchm.errorCodes.includes(response.statusCode)
          ),
        }
      : { ...retrySchemas }
    if (isEmptyObj(retrySchema)) throw response

    response = await this._requestWithRetries(request, retrySchema)
    if (response.success) return response

    //STEP03: nếu response không thành công, kiểm tra nếu không thành công là do network.
    //Thì ta sẽ xem có cần hold lại để đợi network xong rồi thực hiện lại một lần nữa hay không.
    //(Thực hiện với retrySchema như ban đầu luôn!)

    if (
      response.statusCode === this.NETWORK_ERROR.statusCode &&
      waitNetworkConfig.shouldHold
    ) {
      const waitRequest = {
        id: Date.now().toString(),
        requestConfig: {
          request,
          retrySchemas,
        },
        expiredAt: Date.now() + waitNetworkConfig.waitNetworkTime, // infinite | 3600*1000 miliseconds
        deferer: new Deferer(),
      }
      this._waitRequests.push(waitRequest)

      await waitRequest.deferer.delay(waitNetworkConfig.waitNetworkTime)

      //Sau khi đợi xong, hoặc không đợi nữa thì mình sẽ xóa cái waitRequest này bên trong waitRequests.
      this._removeWaitRequest(waitRequest.id)

      //Thực hiện lần cuối hoặc cái lần có internet (bởi vì mình sẽ xóa cái setTimeout thì nó sẽ nhảy vào đây!)
      //để kiểm tra xem được không?
      /**
       * [ISSUE]: Hơi đệ quy 1 tí, giờ nghĩ cách xóa cái đệ quy đi.
       */
      const remainTime = Date.now() - waitRequest.expiredAt.getTime()
      response = await this.request(request, retrySchemas, {
        waitNetworkTime: remainTime,
        shouldHold: remainTime > 0,
      })
    } else {
      throw response
    }
  }

  _tryRequest = async (request) => {
    let response = null
    try {
      response = this._decryptor.decrypt(
        this._logger.log(await axios.request(request))
      )
      return {
        statusCode: response.status,
        body: response.data,
      }
    } catch (err) {
      console.log(JSON.stringify(err, null, 4))
      return this.NETWORK_ERROR
    }
  }

  _requestWithRetries = async (request, retrySchema) => {
    const stack = []
    stack.push(retrySchema)

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

  _clearWaitRequests() {
    this._waitRequests = this._waitRequests.reduce((currWaitReqs, wr) => {
      const expiredAt = wr.expiredAt
      if (typeof expiredAt === 'string') {
        currWaitReqs.push(currWaitReqs)
      }

      const now = Date.now()
      if (expiredAt.getTime() < now) {
        currWaitReqs.push(currWaitReqs)
      }

      return currWaitReqs
    }, [])
  }

  _removeWaitRequest(waitReqId) {
    if (waitReqId) {
      this._waitRequests = this._waitRequests.filter(
        (wr) => wr.id !== waitReqId
      )
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

const axiosEngine = new AxiosEngine()
axiosEngine.init(decryptor)(logger)
export default axiosEngine
