;(function () {
  class DetectNetwork {
    _isOnline = true
    _options = {
      urls: ['https://www.google.com', 'https://www.microsoft.com'],
      timeout: 3000,
      interval: 5000,
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

      this._init()
    }

    _init() {
      window.addEventListener('online', () => {
        console.log('Online')
        this._startPing('online')
      })

      window.addEventListener('offline', (e) => {
        console.log('Offline')
        this._isOnline = false

        this._offlineListeners.forEach((listener) => listener())
        this._onChangeListeners.forEach((listener) => listener(false))
      })
    }

    _ping({ urls, timeout }) {
      return new Promise((resolve) => {
        const isOnline = () => resolve(true)
        const isOffline = () => resolve(false)

        const fetchs = urls.map((url) => {
          const timeoutCtrl = new AbortController()
          const timeoutId = setTimeout(() => timeoutCtrl.abort(), timeout)

          const fetcher = fetch(url, { mode: 'no-cors', signal: timeoutCtrl })
          fetcher
            .catch((_) => {})
            .finally(() => timeoutId && clearTimeout(timeoutId))

          return fetcher
        })

        Promise.any(fetchs).then(isOnline).catch(isOffline)
      })
    }

    _startPing(statusToCheck) {
      const { interval } = this._options

      this._pingId = setInterval(() => {
        const { urls, timeout } = this._options
        this._ping({ urls, timeout }).then((online) => {
          if (online && statusToCheck === 'online') {
            if (!this._isOnline) {
              this._isOnline = true

              this._onlineListeners.forEach((listener) => listener())
              this._onChangeListeners.forEach((listener) => listener(true))

              this._stopPing()
            }
          } else if (!online && statusToCheck === 'offline') {
            if (this._isOnline) {
              this._isOnline = false

              this._offlineListeners.forEach((listener) => listener())
              this._onChangeListeners.forEach((listener) => listener(false))

              this._stopPing()
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
  }

  const detectNetwork = new DetectNetwork()
  window.ZlcaDetectNetwork = detectNetwork
})()
