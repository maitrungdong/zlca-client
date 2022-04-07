class Login {
  _authRepo = null
  constructor(authRepo) {
    this._authRepo = authRepo
  }

  async invoke(userInfo) {
    await this._authRepo.login(userInfo)
  }
}

export default Login
