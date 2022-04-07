import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import catchError from 'utils/catchError.js'
import authService from 'infrastructure/api/authService.js'

const login = createAsyncThunk('app/login', async (userInfo, thunkAPI) => {
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
})

const logout = createAsyncThunk('auth/logout', async (userId, thunkAPI) => {
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
})

const register = createAsyncThunk(
  'auth/registerUser',
  async (userData, thunkAPI) => {
    try {
      console.log({
        userData,
        thunkAPI,
      })

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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userInfo = action.payload
        state.isLoggedIn = true
        state.isLoading = false
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.errMessage = action.payload.errMessage
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false
        state.isLoading = false
        state.userInfo = null
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.userInfo = action.payload
      })
      .addCase(register, (state, action) => {
        state.isLoading = false
        state.errMessage = action.payload.errMessage
      })
  },
})

export const authActions = {
  login,
  logout,
  register,
  ...authSlice.actions,
}

export default authSlice.reducer
