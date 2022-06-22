class BaseError extends Error {
  constructor(name, message, statusCode, data) {
    super(message)

    Object.setPrototypeOf(this, new.target.prototype)
    this.success = false
    this.name = name
    this.statusCode = statusCode
    this.data = data
    Error.captureStackTrace(this)
  }
}
export default BaseError
