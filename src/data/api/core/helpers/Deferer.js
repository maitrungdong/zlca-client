class Deferer {
  _timeoutId = null
  _promiseResolve = null

  cancelDelay() {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId)
      if (typeof this._promiseResolve === 'function') {
        this._promiseResolve()
      }
    }
  }

  delay(ms) {
    return new Promise((resolve) => {
      this._promiseResolve = resolve
      this._timeoutId = setTimeout(resolve, ms)
    })
  }
}

export default Deferer
