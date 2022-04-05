import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import conversationsService from 'infrastructure/api/conversationsService.js'

const saveNewMessageOfMe = createAsyncThunk(
  'currentConver/saveNewMessageOfMe',
  async (newMessage, thunkAPI) => {
    try {
      const res = await conversationsService.saveNewMessageOfMe(newMessage)
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

const switchCurrentConver = createAsyncThunk(
  'currentConver/switchCurrentConver',
  async (conver, thunkAPI) => {
    try {
      const res = await conversationsService.getAllMessages(conver.id)
      if (res.success) {
        return {
          currentConver: conver,
          ...res.data,
        }
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
  currentConver: null,
  messages: [],
  members: [],

  isLoading: false,
  errMessage: null,
}

const currentConverSlice = createSlice({
  name: 'currentConver',
  initialState,
  reducers: {
    saveArrivalMessage(state, action) {
      state.messages.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(switchCurrentConver.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(switchCurrentConver.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentConver = action.payload.currentConver
        state.members = action.payload.currentConver.members
        state.messages = action.payload.messagesOfConver
      })
      .addCase(switchCurrentConver.rejected, (state, action) => {
        state.isLoading = false
        state.errMessage = action.payload.errMessage
      })
      .addCase(saveNewMessageOfMe.pending, (state, action) => {
        state.isLoading = true
        state.isSendingMessage = true
      })
      .addCase(saveNewMessageOfMe.fulfilled, (state, action) => {
        state.messages.push(action.payload)
        state.isLoading = false
        state.isSendingMessage = false
      })
      .addCase(saveNewMessageOfMe.rejected, (state, action) => {
        state.isLoading = false
        state.isSendingMessage = false
        state.errMessage = action.payload.errMessage
      })
  },
})

export const currentConverActions = {
  switchCurrentConver,
  saveNewMessageOfMe,
  ...currentConverSlice.actions,
}

export default currentConverSlice.reducer
