class Logout {
  _authRepo = null
  constructor(authRepo) {
    this._authRepo = authRepo
  }

  async invoke(userId) {
    try {
      return await this._authRepo.logout(userId)
    } catch (err) {
      throw err
    }
  }
}

export default Logout
