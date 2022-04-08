import { reduxStore } from '../reduxStore.js'
import { authActions } from '../slices/authSlice.js'

class AuthStore {
  subscribeToAuthState(callback) {
    reduxStore.subscribe(() => {
      callback(reduxStore.getState().auth)
    })
  }
  loginPending() {
    reduxStore.dispatch(authActions.loginPending())
  }
  loginFulfilled(userInfo) {
    reduxStore.dispatch(authActions.loginFulfilled({ userInfo }))
  }
  loginRejected(errMessage) {
    reduxStore.dispatch(authActions.loginRejected({ errMessage }))
  }
  logoutFulfilled() {
    reduxStore.dispatch(authActions.logoutFulfilled())
  }
  registerPending() {
    reduxStore.dispatch(authActions.registerPending())
  }
  registerFulfilled(userInfo) {
    reduxStore.dispatch(authActions.registerFulfilled({ userInfo }))
  }
  registerRejected(errMessage) {
    reduxStore.dispatch(authActions.registerRejected({ errMessage }))
  }
}

const authStore = new AuthStore()
export default authStore
