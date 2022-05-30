import authRepository from 'data/repositories/AuthRepository.js'
import ObservableUseCase from 'usecases/ObservableUseCase.js'
class Logout extends ObservableUseCase {
  _authRepo = null
  constructor(authRepo) {
    super()

    this._authRepo = authRepo
  }

  async invoke(data, options = { shouldNotify: true }) {
    try {
      await this._authRepo.logout(data.userId)
      if (options.shouldNotify) {
        this.notifyListeners({
          userId: data,
        })
      }
    } catch (err) {
      throw err
    }
  }
}

const logoutUseCase = new Logout(authRepository)

export default logoutUseCase
