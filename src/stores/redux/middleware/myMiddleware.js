import { socketEvents } from 'utils/constants.js'

import messagesManager from 'managers/MessagesManager.js'

import SocketClient from 'socket/socketClient.js'

const myMiddleware = () => {
  return (store) => (next) => (action) => {
    if (action.type === 'persist/REHYDRATE' && action.payload?.isLoggedIn) {
      const { userInfo } = action.payload

      SocketClient.init([
        {
          event: socketEvents.GET_MESSAGE,
          callback: (data) => {
            messagesManager.saveArrivalMessage(data.message)
          },
        },
      ])

      SocketClient.emit({
        event: socketEvents.ADD_NEW_USER,
        payload: userInfo.id,
      })
    }

    return next(action)
  }
}

export default myMiddleware()
