class NetworkStatus {
  constructor() {
    this.onlineListener = []
    this.offlineListener = []
    this.changeListener = []
  }

  addEventListener(event, listener) {
    if (event === 'online') {
      window.addEventListener('online', listener)
      this.onlineListener.push(listener)
    }
    if (event === 'offline') {
      window.addEventListener('offline', listener)
      this.offlineListener.push(listener)
    }
    if (event === 'change') {
      window.addEventListener('online', listener)
      window.addEventListener('offline', listener)
      this.changeListener.push(listener)
    }
  }

  async callAnAPItoTest() {
    const res = await fetch('../data/api/core/img1x1.png')
    console.log({ res })
  }

  removeListener(event, listener) {
    switch (event) {
      case 'online': {
        window.removeEventListener('online', listener)
        this.onlineListener = this.onlineListener.filter((l) => l !== listener)
        break
      }
      case 'offline': {
        window.removeEventListener('offline', listener)
        this.offlineListener = this.offlineListener.filter(
          (l) => l !== listener
        )
        break
      }
      case 'change': {
        window.removeEventListener('online', listener)
        window.removeEventListener('offline', listener)
        this.changeListener = this.changeListener.filter((l) => l !== listener)
        break
      }
      default:
        break
    }
  }
}

const networkStatus = new NetworkStatus()
networkStatus.callAnAPItoTest()

export default networkStatus
