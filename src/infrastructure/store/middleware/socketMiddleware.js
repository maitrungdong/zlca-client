import { socketActions } from '../slices/socketSlice.js'
import { io } from 'socket.io-client'

import { serverBaseURLs, socketEvents } from 'utils/constants.js'
import { currentConverActions } from '../slices/currentConverSlice.js'

import {
  initSocketClient,
  getSocketClient,
} from 'infrastructure/socket/socketClient.js'

const socketMiddleware = (initSocketClient) => {
  return (store) => (next) => (action) => {
    console.log(action)
    if (action.type === 'persist/REHYDRATE' && action.payload?.isLoggedIn) {
      const { userInfo } = action.payload
      let socket = getSocketClient()
      if (socket === null) {
        initSocketClient()
        socket = getSocketClient()
        socket.emit(socketEvents.ADD_NEW_USER, userInfo.id)

        //Add event listeners
        socket.on(socketEvents.GET_MESSAGE, (data) => {
          store.dispatch(currentConverActions.saveArrivalMessage(data.message))
        })
      }
    } else if (action.type === 'currentConver/saveNewMessageOfMe/fulfilled') {
      const me = store.getState().app.userInfo
      const members = store.getState().currentConver.members

      const socket = getSocketClient()

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

export default socketMiddleware(initSocketClient)
