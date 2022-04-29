import SocketClient from 'socket/socketClient.js'

class Logout {
  _authRepo = null
  constructor(authRepo) {
    this._authRepo = authRepo
  }

  async invoke(userId) {
    try {
      console.log({ LogoutUserId: userId })
      await this._authRepo.logout(userId)

      SocketClient.disconnect()
    } catch (err) {
      throw err
    }
  }
}

export default Logout
