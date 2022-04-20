class Register {
  _authRepo = null
  constructor(authRepo) {
    this._authRepo = authRepo
  }

  async invoke(userInfo) {
    try {
      return await this._authRepo.register(userInfo)
    } catch (err) {
      throw err
    }
  }
}

export default Register
