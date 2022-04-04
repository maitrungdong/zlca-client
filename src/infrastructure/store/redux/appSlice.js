<<<<<<< HEAD:src/infrastructure/store/redux/appSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import appService from '@api/appService.js'
=======
import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import catchError from '../../../utils/catchError'
import authService from '../../api/authService'
>>>>>>> socket-middleware-redux:src/app/redux/slices/appSlice.js

const loginUser = createAsyncThunk(
  'app/loginUser',
  async (userData, thunkAPI) => {
    try {
      const res = await authService.loginUser(userData)
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

const logoutUser = createAsyncThunk(
  'app/logoutUser',
  async (userId, thunkAPI) => {
    try {
      const res = await authService.logoutUser(userId)
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
