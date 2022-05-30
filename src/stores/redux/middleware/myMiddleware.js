import SocketClient from 'socket/socketClient.js'

const myMiddleware = () => {
  return (store) => (next) => (action) => {
    if (action.type === 'persist/REHYDRATE' && action.payload?.isLoggedIn) {
      const { userInfo } = action.payload
      SocketClient.onUserLoggedIn({ userId: userInfo.id })
    }

    return next(action)
  }
}

export default myMiddleware()
