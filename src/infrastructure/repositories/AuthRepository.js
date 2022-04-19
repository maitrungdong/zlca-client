import authStore from 'infrastructure/store/redux/stores/AuthStore.js'
import authAPIDataSource from 'infrastructure/api/authAPIDataSource.js'
import catchError from 'utils/catchError.js'

class AuthRepository {
  async login(userInfo) {
    try {
      authStore.loginLoading()

      const res = await authAPIDataSource.login(userInfo)
      if (res.success) {
        authStore.loginSuccess(res.data)
      } else {
        throw new Error(res.message)
      }
    } catch (err) {
      const errMessage = catchError(err)
      authStore.loginFailed(errMessage)
    }
  }
  async logout(userId) {
    try {
      const res = await authAPIDataSource.logout(userId)
      if (res.success) {
        authStore.logoutSuccess()
      } else {
        throw new Error(res.message)
      }
    } catch (err) {
      const errMessage = catchError(err)
    }
  }

  async register(userInfo) {
    try {
      authStore.registerLoading()
      const res = await authAPIDataSource.register(userInfo)
      if (res.success) {
        authStore.registerSuccess(res.data)
      } else {
        throw new Error(res.message)
      }
    } catch (err) {
      const errMessage = catchError(err)
      authStore.registerFailed(errMessage)
    }
  }
}

const authRepository = new AuthRepository()
export default authRepository
