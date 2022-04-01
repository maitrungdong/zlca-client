import { createContext } from 'react'

const SocketContext = createContext({
  socketClient: null,
})

export default SocketContext
