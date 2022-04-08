import authStore from 'infrastructure/store/redux/stores/AuthStore.js'
import authAPIDataSource from 'infrastructure/api/authAPIDataSource.js'
import catchError from 'utils/catchError.js'

class AuthRepository {
  async login(userInfo) {
    try {
      authStore.loginPending()
      const res = await authAPIDataSource.login(userInfo)
      if (res.success) {
        authStore.loginFulfilled(res.data)
      } else {
        throw new Error(res.message)
      }
    } catch (err) {
      const errMessage = catchError(err)
      authStore.loginRejected(errMessage)
    }
  }
  async logout(userId) {
    try {
      const res = await authAPIDataSource.logout(userId)
      if (res.success) {
        authStore.logoutFulfilled()
      } else {
        throw new Error(res.message)
      }
    } catch (err) {
      const errMessage = catchError(err)
    }
  }

  async register(userInfo) {
    try {
      authStore.registerPending()
      const res = await authAPIDataSource.register(userInfo)
      if (res.success) {
        authStore.registerFulfilled(res.data)
      } else {
        throw new Error(res.message)
      }
    } catch (err) {
      const errMessage = catchError(err)
      authStore.registerRejected(errMessage)
    }
  }
}

const authRepository = new AuthRepository()
export default authRepository
