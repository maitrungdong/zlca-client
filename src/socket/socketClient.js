import { io } from 'socket.io-client'
import { serverBaseURLs } from 'utils/constants.js'

const SocketClient = (function () {
  let socketInstance = null

  const createInstance = () => {
    const instance = io(serverBaseURLs.SOCKET)
    return instance
  }

  return {
    init: (listeners = []) => {
      if (!socketInstance) {
        console.log('CREATING...socket')
        socketInstance = createInstance()
        console.log('CREATED...socket')

        //TODO: Đăng kí các listener{event, callback} cho socketInstance.
        listeners.forEach((listener) => {
          socketInstance.on(listener.event, listener.callback)
        })
      }
    },
    listen({ event, callback }) {
      socketInstance.on(event, callback)
    },
    emit({ event, payload }) {
      socketInstance.emit(event, payload)
    },
    disconnect: () => {
      if (socketInstance) {
        console.log('DISCONNECTING...socket')
        socketInstance.disconnect()
        console.log({ socketInstance })
      }
    },
  }
})()

export default SocketClient
