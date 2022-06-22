import axiosCore from './AxiosCore.js'
import decryptor from './helpers/decryptor.js'
import delay from './helpers/delay.js'
import logger from './helpers/logger.js'
import waitRequestsManager from './helpers/waitRequestsManager.js'

import { isEmptyObj } from 'utils/checks.js'
import 'utils/networkStatus.js'
import { errorCodes } from 'utils/constants.js'
import BadRequestError from './helpers/Types/Errors/BadRequestError.js'
import BlockedUrlError from './helpers/Types/Errors/BlockedUrlError.js'
import Api404Error from './helpers/Types/Errors/Api404Error.js'
import DisconnectNetworkError from './helpers/Types/Errors/DisconnectNetworkError.js'

class AxiosEngine {
  //Network_error: mã lỗi trả về khi kết nối mạng không thành công.
  NETWORK_ERROR = {
    statusCode: errorCodes.DISNETWORK_ERROR,
    contentType: 'application/json',
    body: {
      success: false,
      data: null,
      message: 'Disconnect network! Please, try again later.',
    },
  }

  _waitRequestsManager = null

  useWaitRequestsManager(waitRequestsManager) {
    this._waitRequestsManager = waitRequestsManager
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
      const waitRequest = this._waitRequestsManager.createWaitRequest(
        request,
        retrySchemas,
        waitNetworkConfig.waitNetworkTime
      )

      await waitRequest.deferer.delay(waitNetworkConfig.waitNetworkTime)

      //Sau khi đợi xong, hoặc không đợi nữa thì mình sẽ xóa cái waitRequest này bên trong waitRequests.
      this._waitRequestsManager.removeWaitRequestById(waitRequest.id)

      //Thực hiện lần cuối hoặc cái lần có internet (bởi vì mình sẽ xóa cái setTimeout thì nó sẽ nhảy vào đây!)
      //để kiểm tra xem được không?
      /**
       * [ISSUE]: Hơi đệ quy 1 tí, giờ nghĩ cách xóa cái đệ quy đi.
       */
      const remainTime = this._waitRequestsManager.getRemainTime(
        waitRequest.expiredAt
      )

      return await this.request(request, retrySchemas, {
        waitNetworkTime: remainTime,
        shouldHold: remainTime === 'infinite' || remainTime > 0,
      })
    } else {
      throw response
    }
  }

  _tryRequest = async (request) => {
    try {
      const response = await axiosCore.request(request)

      return {
        statusCode: response.status,
        body: response.data,
      }
    } catch (err) {
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

  _standardResponse = ({ statusCode, body }) => {
    let error = null

    if (statusCode < 200 || statusCode >= 300) {
      error = this._createError(statusCode, body)
    }

    if (error) {
      return error
    } else {
      return this._createSuccess(body)
    }
  }

  _createSuccess(body) {
    return {
      success: body.success,
      data: body.data,
      message: body.message,
    }
  }

  _createError(statusCode, body) {
    let error = null
    const errMsg = body?.success !== false ? body.message : JSON.stringify(body)

    switch (statusCode) {
      case errorCodes.BAD_REQUEST: {
        error = new BadRequestError(errMsg, body.data)
        break
      }
      case errorCodes.BLOCKED_URL: {
        error = new BlockedUrlError(errMsg, body.data)
        break
      }
      case errorCodes.NOT_FOUND: {
        error = new Api404Error(errMsg, body.data)
        break
      }
      case errorCodes.DISNETWORK_ERROR: {
        error = new DisconnectNetworkError(errMsg, body.data)
        break
      }
      default: {
        error = new Error('Error happened! Please, try it later.')
        break
      }
    }

    return error
  }
}

const axiosEngine = new AxiosEngine()
axiosEngine.useDecryptor(decryptor)
axiosEngine.useLogger(logger)
axiosEngine.useWaitRequestsManager(waitRequestsManager)

export default axiosEngine
