import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import catchError from 'utils/catchError.js'
import authService from 'infrastructure/api/authService.js'

const loginUser = createAsyncThunk(
  'app/loginUser',
  async (userInfo, thunkAPI) => {
    try {
      const res = await authService.login(userInfo)
      if (res.success) {
        return res.data
      } else {
        throw new Error(res.message)
      }
    } catch (err) {
      console.log({ err })
      return thunkAPI.rejectWithValue({
        errMessage: catchError(err),
      })
    }
  }
)

const logoutUser = createAsyncThunk(
  'app/logoutUser',
  async (userId, thunkAPI) => {
    try {
      const res = await authService.logout(userId)
      if (res.success) {
        return res.data
      } else {
        throw new Error(res.message)
      }
    } catch (err) {
      return thunkAPI.rejectWithValue({
        errMessage: catchError(err),
      })
    }
  }
)

const registerUser = createAsyncThunk(
  'app/registerUser',
  async (userData, thunkAPI) => {
    try {
      console.log({
        userData,
        thunkAPI,
      })

      //Post userData to server to register... And then get returned data from server to return function

      return {
        ...userData,
      }
    } catch (err) {
      return thunkAPI.rejectWithValue({
        errMessage: catchError(err),
      })
    }
  }
)

const initialState = {
  isLoggedIn: false,
  userInfo: null,

  isLoading: false,
  errMessage: '',
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userInfo = action.payload
        state.isLoggedIn = true
        state.isLoading = false
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.errMessage = action.payload.errMessage
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoggedIn = false
        state.isLoading = false
        state.userInfo = null
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.userInfo = action.payload
      })
      .addCase(registerUser, (state, action) => {
        state.isLoading = false
        state.errMessage = action.payload.errMessage
      })
  },
})

export const appActions = {
  loginUser,
  logoutUser,
  registerUser,
  ...appSlice.actions,
}

export default appSlice.reducer
