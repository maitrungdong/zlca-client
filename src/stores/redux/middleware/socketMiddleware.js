import { socketEvents } from 'utils/constants.js'

import conversStore from 'stores/ConversationsStore.js'
import messagesManager from 'managers/MessagesManager'

import {
  initSocketClient,
  getSocketClient,
  disconnect,
} from 'socket/socketClient.js'

/** [ISSUES]: Socket nên một module riêng, chúng ta nên tạo kết nối, hay listen
 * events ở một chỗ khác! Không nên bỏ ở đây.
 * Maybe chúng ta có thể sử dụng redux middleware... hoặc không sử dụng luôn!
 * Tách bạch nó ra luôn!
 * Hmm,...
 * Khi nói đến đây ta lại gặp một vấn đề nữa đó là: chúng ta lại viết code dính chặt
 * vào redux rồi! Mãi sau không dùng redux nữa thì sao?
 * Hmm, như vậy thì không ổn chút nào.
 * => Sửa lại.
 */

const socketMiddleware = (initSocketClient) => {
  return (store) => (next) => (action) => {
    if (
      action.type === 'auth/loginFulfilled' ||
      (action.type === 'persist/REHYDRATE' && action.payload?.isLoggedIn)
    ) {
      const { userInfo } = action.payload

      let socket = getSocketClient()
      if (socket === null) {
        initSocketClient()
        socket = getSocketClient()
        socket.emit(socketEvents.ADD_NEW_USER, userInfo.id)

        //Add event listeners
        socket.on(socketEvents.GET_MESSAGE, (data) => {
          messagesManager.saveArrivalMessage(data.message)
        })
      }
    } else if (action.type === 'messages/saveMessageFulfilled') {
      const me = store.getState().auth.userInfo
      const currentConver = conversStore.getCurrentConver()
      const members = currentConver.members

      const socket = getSocketClient()

      try {
        socket.emit(socketEvents.SEND_MESSAGE, {
          senderId: me.id,
          receiverId: members.find((mem) => mem.id !== me.id).id,
          message: action.payload.newMessage,
        })
      } catch (err) {
        console.log(err)
      }
    } else if (action.type === 'auth/logoutFulfilled') {
      disconnect()
    }
    return next(action)
  }
}

export default socketMiddleware(initSocketClient)
