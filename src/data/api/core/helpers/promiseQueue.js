export default class PromiseQueue {
  constructor() {
    this.queue = []
    this.isProcessing = false
  }

  add(queueItem) {
    return new Promise((resolve, reject) => {
      this.queue.push(() => queueItem().then(resolve, reject))
      this.processQueue()
    })
  }

  processQueue() {
    if (!this.isProcessing && this.queue[0]) {
      this.isProcessing = true
      const processedItem = this.queue.shift()
      processedItem.finally(() => {
        this.isProcessing = false
        this.processQueue()
      })
    }
  }
}
