import { io } from 'socket.io-client'
import { serverBaseURLs } from 'utils/constants.js'

let socketClient = null

export const initSocketClient = () => {
  socketClient = io(serverBaseURLs.SOCKET)
  return socketClient
}

export const getSocketClient = () => {
  return socketClient
}

export const disconnect = () => {
  socketClient.disconnect()
}
