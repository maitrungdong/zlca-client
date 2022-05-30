import authRepository from 'data/repositories/AuthRepository.js'
import ObservableUseCase from 'usecases/ObservableUseCase.js'

class Login extends ObservableUseCase {
  _authRepo = null

  constructor(authRepo) {
    super()
    this._authRepo = authRepo
  }

  async invoke(data, options = { shouldNotify: false }) {
    try {
      const res = await this._authRepo.login(data.userInfo)

      if (options.shouldNotify) {
        this.notifyListeners({
          userId: res.id,
        })
      }
      return res
    } catch (err) {
      throw err
    }
  }
}

const loginUseCase = new Login(authRepository)
export default loginUseCase
