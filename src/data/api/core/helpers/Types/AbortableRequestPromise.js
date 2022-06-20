//AbortablePendingRequest class dùng để tạo ra các custome request promise,
//hỗ trợ abort function.
class AbortablePendingRequest {
  pendingRequest = null
  abortCtrl = null
  constructor(pendingRequest, abortCtrl) {
    this.pendingRequest = pendingRequest
    this.abortCtrl = abortCtrl
  }

  abort(afterMs = 0) {
    if (this.abortCtrl) {
      setTimeout(() => this.abortCtrl.abort(), afterMs)
    }
  }

  then(onFulfilled) {
    return this.pendingRequest.then(onFulfilled)
  }

  catch(onRejected) {
    return this.pendingRequest.catch(onRejected)
  }
}

export default AbortablePendingRequest
