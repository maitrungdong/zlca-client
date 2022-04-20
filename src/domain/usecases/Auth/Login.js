class Login {
  _authRepo = null
  constructor(authRepo) {
    this._authRepo = authRepo
  }

  async invoke(userInfo) {
    try {
      return await this._authRepo.login(userInfo)
    } catch (err) {
      throw err
    }
  }
}

export default Login
