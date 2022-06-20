class Logger {
  log(response) {
    console.log('>>>LOGGER: running...')
    console.log(response)
    console.log('>>>LOGGER: ended...')

    return response
  }
}

const logger = new Logger()
export default logger
