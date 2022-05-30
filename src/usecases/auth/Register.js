import authRepository from 'data/repositories/AuthRepository.js'
class Register {
  _authRepo = null
  constructor(authRepo) {
    this._authRepo = authRepo
  }

  async invoke(data, options = { shouldNotify: false }) {
    try {
      return await this._authRepo.register(data.userInfo)
    } catch (err) {
      throw err
    }
  }
}

const registerUseCase = new Register(authRepository)
export default registerUseCase
