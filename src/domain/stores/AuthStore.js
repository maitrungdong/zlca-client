import { reduxStore } from './redux/reduxStore.js'
import { authActions } from './redux/slices/authSlice.js'

class AuthStore {
  subscribeToAuthState(callback) {
    reduxStore.subscribe(() => {
      callback(reduxStore.getState().auth)
    })
  }

  loginLoading() {
    reduxStore.dispatch(authActions.loginPending())
  }
  loginSuccess(userInfo) {
    reduxStore.dispatch(authActions.loginFulfilled({ userInfo }))
  }
  loginFailed(errMessage) {
    reduxStore.dispatch(authActions.loginRejected({ errMessage }))
  }

  logoutSuccess() {
    reduxStore.dispatch(authActions.logoutFulfilled())
  }

  registerLoading() {
    reduxStore.dispatch(authActions.registerPending())
  }
  registerSuccess(userInfo) {
    reduxStore.dispatch(authActions.registerFulfilled({ userInfo }))
  }
  registerFailed(errMessage) {
    reduxStore.dispatch(authActions.registerRejected({ errMessage }))
  }

  getMe() {
    return reduxStore.getState().auth.userInfo
  }
}

const authStore = new AuthStore()
export default authStore
