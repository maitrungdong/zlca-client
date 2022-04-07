class Register {
  _authRepo = null
  constructor(authRepo) {
    this._authRepo = authRepo
  }

  async invoke(userInfo) {
    await this._authRepo.register(userInfo)
  }
}

export default Register
