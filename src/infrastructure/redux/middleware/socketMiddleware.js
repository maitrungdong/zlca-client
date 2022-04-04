import { socketActions } from '../slices/socketSlice.js'
import { io } from 'socket.io-client'
import { serverBaseURLs } from '../../../utils/constants.js'
import { currentConverActions } from '../slices/currentConverSlice.js'
import { socketEvents } from '../../../utils/constants.js'

const socketMiddleware = () => {
  let socket = null

  return (store) => (next) => (action) => {
    console.log(action)
    if (action.type === 'persist/REHYDRATE' && action.payload?.isLoggedIn) {
      const { userInfo } = action.payload
      if (socket === null) {
        socket = io(serverBaseURLs.SOCKET)
        socket.emit(socketEvents.ADD_NEW_USER, userInfo.id)

        //Add event listeners
        socket.on(socketEvents.GET_MESSAGE, (data) => {
          store.dispatch(currentConverActions.saveArrivalMessage(data.message))
        })
      }
    } else if (action.type === 'currentConver/saveNewMessageOfMe/fulfilled') {
      const me = store.getState().app.userInfo
      const members = store.getState().currentConver.members

      try {
        socket.emit(socketEvents.SEND_MESSAGE, {
          senderId: me.id,
          receiverId: members.find((mem) => mem.id !== me.id).id,
          message: action.payload,
        })
      } catch (err) {
        console.log(err)
      }
    }
    return next(action)
  }
}

export default socketMiddleware()
