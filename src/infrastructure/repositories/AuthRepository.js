import authStore from 'infrastructure/store/redux/stores/AuthStore.js'

class AuthRepository {
  async login(userInfo) {
    //Call HTTP request or
    //store
    authStore.login(userInfo)
  }
  async logout(userId) {
    authStore.logout(userId)
  }
  async register(userInfo) {
    authStore.register(userInfo)
  }
}

const authRepository = new AuthRepository()
export default authRepository
