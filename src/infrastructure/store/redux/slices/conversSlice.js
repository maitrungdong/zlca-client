import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import conversService from 'infrastructure/api/conversService.js'

const getConversOfUser = createAsyncThunk(
  'convers/getConversOfUser',
  async (userId, thunkAPI) => {
    try {
      const res = await conversService.getConversOfUser(userId)
      if (res.success) {
        return res.data
      } else {
        throw new Error(res.message)
      }
    } catch (err) {
      return thunkAPI.rejectWithValue({
        errMessage: err.message,
      })
    }
  }
)

const initialState = {
  convers: [],

  isLoading: false,
  errMessage: null,
}

const conversSlice = createSlice({
  name: 'convers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getConversOfUser.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(getConversOfUser.fulfilled, (state, action) => {
        state.convers = action.payload.conversations
        state.isLoading = false
      })
      .addCase(getConversOfUser.rejected, (state, action) => {
        state.isLoading = false
        state.errMessage = action.payload.errMessage
      })
  },
})

export const conversActions = {
  getConversOfUser,
  ...conversSlice.actions,
}

export default conversSlice.reducer
