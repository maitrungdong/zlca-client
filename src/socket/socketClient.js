import { io } from 'socket.io-client'

import { serverBaseURLs } from 'utils/constants.js'
import { socketEvents } from 'utils/constants.js'

//use cases:
import loginUseCase from 'usecases/auth/Login.js'
import saveNewMessageUseCase from 'usecases/messages/SaveNewMessage.js'
import saveArrivalMessageUseCase from 'usecases/messages/SaveArrivalMessage.js'
import logoutUseCase from 'usecases/auth/Logout'
import chatWithUserUseCase from 'usecases/convers/ChatWithUser'
import saveArrivalConverUseCase from 'usecases/convers/SaveArrivalConver.js'

const SocketClient = (function () {
  let socketInstance = null

  const createInstance = () => {
    const instance = io(serverBaseURLs.SOCKET)
    return instance
  }

  return {
    init: (listeners = []) => {
      if (!socketInstance) {
        console.log('CREATING SOCKET INSTANCE...')
        socketInstance = createInstance()
        console.log('CREATED SOCKET INSTANCE...', socketInstance)

        console.log({ listeners })
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
        socketInstance.disconnect()
        socketInstance = null
      }
    },

    sendNewMsg(data) {
      SocketClient.emit({
        event: socketEvents.SEND_MESSAGE,
        payload: {
          senderId: data.newMessage.senderId,
          receiverId: data.receiverId,
          message: data.newMessage,
        },
      })
    },
    createNewConver(data) {
      if (!data.isOldConver) {
        SocketClient.emit({
          event: socketEvents.CREATE_CONVER,
          payload: {
            conversation: data.conversation,
            receiverId: data.receiverId,
          },
        })
      }
    },
    onUserLoggedIn({ userId }) {
      const eventListeners = [
        {
          event: socketEvents.GET_MESSAGE,
          callback: (data) => {
            //TODO: socket call use case
            saveArrivalMessageUseCase.invoke(
              {
                arrivalMessage: data.message,
              },
              {
                shouldNotify: true,
              }
            )
          },
        },
        {
          event: socketEvents.GET_CONVER,
          callback: (data) => {
            saveArrivalConverUseCase.invoke(
              {
                arrivalConver: data.arrivalConver,
              },
              {
                shouldNotify: true,
              }
            )
          },
        },
      ]
      SocketClient.init(eventListeners)

      SocketClient.emit({
        event: socketEvents.ADD_NEW_USER,
        payload: userId,
      })
    },

    onUserLoggedOut(data) {
      SocketClient.disconnect()
    },
  }
})()

saveNewMessageUseCase.addListener(SocketClient.sendNewMsg)
chatWithUserUseCase.addListener(SocketClient.createNewConver)
loginUseCase.addListener(SocketClient.onUserLoggedIn)
logoutUseCase.addListener(SocketClient.onUserLoggedOut)

export default SocketClient
