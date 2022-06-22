import BlockedUrlError from './Types/Errors/BlockedUrlError.js'

class Interceptor {
  /**
   * blockedUrl = {
   *  url: string,
   *  expiredAt: Date | 'infinite'
   * }
   */
  _blackList = []

  CLEAR_BLOCKED_URLS_TIME = 60 * 60 * 1000 // an hour

  constructor() {
    //TODO: set interval to clear blockedUrl if it expires each one hour.
    setInterval(this._clearExpiredBlockedUrls, this.CLEAR_BLOCKED_URLS_TIME)
  }

  interceptRequest(request) {
    const { url } = request

    const isBlocked = this.isBlocked(url)
    if (isBlocked) {
      const blockedUrlItem = this._interceptor.getBlockedUrl(url)
      throw new BlockedUrlError(
        `This url: ${blockedUrlItem.url} is blocked to ${blockedUrlItem.expiredAt}! Please try it later.`
      )
    }

    return request
  }

  async interceptResponse(response) {
    try {
      return await response
    } catch (err) {
      if (err instanceof BlockedUrlError) {
        this.addBlockedURL({
          url: err.url,
          blockTime: err.data.blockTime,
        })
      }
      throw err
    }
  }

  addBlockedURL(item) {
    if (item.blockTime === 'infinite') {
      this._blackList.push({
        url: item.url,
        expiredAt: 'infinite',
      })
    } else {
      this._blackList.push({
        url: item.url,
        expiredAt: new Date(Date.now() + item.blockTime),
      })
    }
  }

  getBlockedURL(url) {
    return this._blackList.find((item) => item.url === url)
  }

  removeBlockedURL(url) {
    if (typeof url !== 'string') return
    this._blackList = this._blackList.filter((item) => item.url !== url)
  }

  isBlocked(url) {
    const item = this._blackList.find((item) => item.url === url)

    if (!item) return true
    if (item.expiredAt === 'infinite') return false

    const remain = item.expiredAt.getTime() - Date.now()
    return remain > 0
  }

  /**
   * Event listener is to listen unblock event from server.
   * @param {object} event an event returned from server to unblock an url
   */
  onUnBlockUrl(event) {
    const { unBlockUrl } = event
    this.removeBlockedURL(unBlockUrl)
  }

  _clearExpiredBlockedUrls() {
    this._blackList = this._blackList.reduce((currBlockedUrls, bu) => {
      const { expiredAt } = bu
      if (expiredAt === 'infinite') {
        currBlockedUrls.push(bu)
      } else if (expiredAt.getTime() < Date.now()) {
        currBlockedUrls.push(bu)
      }

      return currBlockedUrls
    }, [])
  }
}

const interceptor = new Interceptor()
export default interceptor
