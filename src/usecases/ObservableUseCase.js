class ObservableUseCase {
  listeners = null
  constructor() {
    this.listeners = []
  }

  addListener(listener) {
    if (typeof listener === 'function') this.listeners.push(listener)
  }
  removeListener(listener) {
    this.listeners.filter((l) => l !== listener)
  }

  notifyListeners(data) {
    this.listeners.forEach((listener) => listener(data))
  }
}

export default ObservableUseCase
