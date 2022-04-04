import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import conversationsService from 'infrastructure/api/conversationsService.js'

const fetchAllConversOfUser = createAsyncThunk(
  'conversations/fetchAllConversOfUser',
  async (userId, thunkAPI) => {
    try {
      const res = await conversationsService.getAllConversOfUser(userId)
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
  conversations: [],

  isLoading: false,
  errMessage: null,
}

const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllConversOfUser.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchAllConversOfUser.fulfilled, (state, action) => {
        state.conversations = action.payload.conversations
        state.isLoading = false
      })
      .addCase(fetchAllConversOfUser.rejected, (state, action) => {
        state.isLoading = false
        state.errMessage = action.payload.errMessage
      })
  },
})

export const conversationsActions = {
  fetchAllConversOfUser,
  ...conversationsSlice.actions,
}

export default conversationsSlice.reducer
