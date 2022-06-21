class Interceptor {
  _blackList = []
  addBlockedURL(item) {
    this._blackList.push({
      url: item.url,
      expiredAt: new Date() + item.blockTime,
    })
  }
  removeBlockedURL(url) {
    if (typeof url === 'string') return
    this._blackList = this._blackList.filter((item) => item.url !== url)
  }
  check(url) {
    const item = this._blackList.find((item) => item.url === url)
    if (!item) return
    const remain = item.expiredAt.getTime() - Date.now()
    return remain > 0
  }
}

const interceptor = new Interceptor()
export default interceptor
