import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  userInfo: null,

  isLoading: false,
  errMessage: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginPending(state, action) {
      state.isLoading = true
    },
    loginFulfilled(state, action) {
      state.isLoggedIn = true
      state.userInfo = action.payload.userInfo
      state.isLoading = false
    },
    loginRejected(state, action) {
      state.isLoading = false
      state.errMessage = action.payload.errMessage
    },
    logoutFulfilled(state, action) {
      state.isLoggedIn = false
      state.isLoading = false
      state.userInfo = null
    },
    registerPending(state, action) {
      state.isLoading = true
    },
    registerFulfilled(state, action) {
      state.isLoading = false
      state.userInfo = action.payload.userInfo
    },
    registerRejected(state, action) {
      state.isLoading = false
      state.errMessage = action.payload.errMessage
    },
  },
})

export const authActions = {
  ...authSlice.actions,
}

export default authSlice.reducer
