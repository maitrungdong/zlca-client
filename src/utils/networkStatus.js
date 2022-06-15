;(function () {
  class DetectNetwork {
    _isOnline = true
    _options = {
      //Cải tiến thành ping nhiều url hơn để detect chính xác hơn,
      //chỉ cần 1 trong list url thành công thì ta sẽ cho rằng việc kết nối này thành công!
      urls: ['https://www.google.com', 'https://www.microsoft.com'],
      timeout: 3000,
      interval: 10000,
    }
    _onlineListeners = []
    _offlineListeners = []
    _onChangeListeners = []

    constructor(options = {}) {
      if (Array.isArray(options.urls)) {
        this._options.urls = options.urls
      }
      if (typeof options.timeout === 'number') {
        this._options.timeout = options.timeout
      }
      if (typeof options.interval === 'number') {
        this._options.interval = options.interval
      }

      //TODO: start ping to servers to check Internet.
      this._startPing()
    }

    addEventListener(event, listener) {
      switch (event) {
        case 'online': {
          this._onlineListeners.push(listener)
          break
        }
        case 'offline': {
          this._offlineListeners.push(listener)
          break
        }
        case 'change': {
          this._onChangeListeners.push(listener)
          break
        }
        default: {
          break
        }
      }
    }

    removeEventListener(event, listener) {
      switch (event) {
        case 'online': {
          this._onlineListeners = this._onlineListeners.filter(
            (l) => l !== listener
          )
          break
        }
        case 'offline': {
          this._offlineListeners = this._offlineListeners.filter(
            (l) => l !== listener
          )
          break
        }
        case 'change': {
          this._onChangeListeners = this._onChangeListeners.filter(
            (l) => l !== listener
          )
          break
        }
        default: {
          break
        }
      }
    }

    _ping({ urls, timeout }) {
      return new Promise((resolve) => {
        const isOnline = () => resolve(true)
        const isOffline = () => resolve(false)

        const fetchs = urls.map((url) => {
          const timeoutCtrl = new AbortController()
          const timeoutId = setTimeout(() => timeoutCtrl.abort(), timeout)

          const fetcher = fetch(url, { mode: 'no-cors' })
          fetcher
            .catch((_) => {})
            .finally(() => timeoutId && clearTimeout(timeoutId))

          return fetcher
        })

        Promise.any(fetchs).then(isOnline).catch(isOffline)
      })
    }

    _startPing() {
      // if (this._pingId) return
      // console.log('pingId: ', this._pingId)

      const { interval } = this._options

      this._pingId = setInterval(() => {
        const { urls, timeout } = this._options
        this._ping({ urls, timeout }).then((online) => {
          if (online) {
            if (!this._isOnline) {
              this._isOnline = true

              //TODO: notify that network status is online
              this._onlineListeners.forEach((listener) => listener())
              this._onChangeListeners.forEach((listener) => listener(true))

              //TODO: reset ping more slowly.
              this._options.interval = 10000
              this._stopPing()
              this._startPing()
            }
          } else {
            if (this._isOnline) {
              this._isOnline = false

              //TODO: notify that network status is offline
              this._offlineListeners.forEach((listener) => listener())
              this._onChangeListeners.forEach((listener) => listener(false))

              //TODO: reset ping more quickly.
              this._options.interval = 5000
              this._stopPing()
              this._startPing()
            }
          }
        })
      }, interval)
    }
    _stopPing() {
      if (this._pingId) {
        clearInterval(this._pingId)
      }
    }
  }

  const detectNetwork = new DetectNetwork()
  window.ZlcaDetectNetwork = detectNetwork
})()
