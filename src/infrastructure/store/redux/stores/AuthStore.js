import { reduxStore } from '../reduxStore.js'
import { authActions } from '../slices/authSlice.js'

/**
 * From MTD: Ở bên ngoài khi sử dụng sẽ tuân thủ interface này
 * của authStore.
 * Giả sử: Ta không dùng redux, mà dùng một state
 * management tool khác thì chỉ cần tuân thủ interface
 * này là được.
 */
class AuthStore {
  subscribeToAuthState(callback) {
    reduxStore.subscribe(() => {
      callback(reduxStore.getState().auth)
    })
  }
  login(userInfo) {
    reduxStore.dispatch(authActions.login(userInfo))
  }
  logout(userId) {
    reduxStore.dispatch(authActions.logout(userId))
  }
  register(userInfo) {
    reduxStore.dispatch(authActions.register(userInfo))
  }
}

const authStore = new AuthStore()
export default authStore
