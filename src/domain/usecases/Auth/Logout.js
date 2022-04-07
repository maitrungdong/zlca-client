class Logout {
  _authRepo = null
  constructor(authRepo) {
    this._authRepo = authRepo
  }

  async invoke(userId) {
    await this._authRepo.logout(userId)
  }
}

export default Logout
