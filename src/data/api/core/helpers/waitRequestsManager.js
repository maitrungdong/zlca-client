import Deferer from './Types/Deferer'

class WaitRequestsManager {
  /**
   * waitRequest = {
   * id: string,
   * requestConfig = {
   *  request,
   *  retrySchemas,
   * },
   * expiredAt: Date | 'infinite',
   * deferer: Deferer,
   * }
   */
  _waitRequests = []

  _isOnline = true
  CLEAR_WAIT_REQUESTS_TIME = 60 * 60 * 1000 // an hour

  constructor() {
    //TODO: add network change listener.
    window.ZlcaDetectNetwork.addEventListener(
      'change',
      this._networkStatusListener
    )

    //TODO: set interval to clear waitRequest if it expires each one hour.
    setInterval(this._clearExpiredWaitRequests, this.CLEAR_WAIT_REQUESTS_TIME)
  }

  removeWaitRequestById(waitReqId) {
    this._waitRequests = this._waitRequests.filter((wr) => wr.id !== waitReqId)
  }

  //function helper
  getRemainTime(expiredAt) {
    let remainTime = null
    if (expiredAt === 'infinite') {
      remainTime = 'infinite'
    } else {
      remainTime = Date.now() - expiredAt.getTime()
    }
    return remainTime
  }

  createWaitRequest(request, retrySchemas, waitNetworkTime) {
    const waitRequest = {
      id: Date.now().toString(),
      requestConfig: {
        request: { ...request },
        retrySchemas: { ...retrySchemas },

        expiredAt:
          waitNetworkTime === 'infinite'
            ? waitNetworkTime
            : new Date(Date.now() + waitNetworkTime), //Date | 'infinite'
        deferer: new Deferer(),
      },
    }

    this._waitRequests.push(waitRequest)
    return waitRequest
  }

  _networkStatusListener(status) {
    if (!this._isOnline && status === 'online') {
      this._waitRequests.forEach((wr) => wr.deferer?.cancelDelay())
      this._isOnline = true
    } else {
      this._isOnline = false
    }
  }

  _clearExpiredWaitRequests() {
    this._waitRequests = this._waitRequests.reduce((currWaitReqs, wr) => {
      const { expiredAt } = wr
      if (expiredAt === 'infinite') {
        currWaitReqs.push(wr)
      } else if (expiredAt.getTime() < Date.now()) {
        currWaitReqs.push(currWaitReqs)
      }

      return currWaitReqs
    }, [])
  }
}

const waitRequestsManager = new WaitRequestsManager()
export default waitRequestsManager
