import messagesManager from 'managers/MessagesManager.js'

import SocketClient from 'socket/socketClient.js'
import { socketEvents } from 'utils/constants.js'

class Login {
  _authRepo = null
  constructor(authRepo) {
    this._authRepo = authRepo
  }

  async invoke(userInfo) {
    try {
      console.log({ USER_INFO: userInfo })
      const res = await this._authRepo.login(userInfo)
      console.log({ USER_INFO_FROM_SERVER: res })
      if (res.id) {
        const { id: userId } = res
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
          payload: userId,
        })
      }
      return res
    } catch (err) {
      throw err
    }
  }
}

export default Login
