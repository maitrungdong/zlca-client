import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import conversService from 'infrastructure/api/conversService.js'

const saveNewMessage = createAsyncThunk(
  'currentConver/saveNewMessage',
  async (newMessage, thunkAPI) => {
    try {
      const res = await conversService.saveNewMessage(newMessage)
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
      const res = await conversService.getMessages(conver.id)
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
  current: null,
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
        state.current = action.payload.currentConver
        state.members = action.payload.currentConver.members
        state.messages = action.payload.messagesOfConver
      })
      .addCase(switchCurrentConver.rejected, (state, action) => {
        state.isLoading = false
        state.errMessage = action.payload.errMessage
      })
      .addCase(saveNewMessage.pending, (state, action) => {
        state.isLoading = true
        state.isSendingMessage = true
      })
      .addCase(saveNewMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload)
        state.isLoading = false
        state.isSendingMessage = false
      })
      .addCase(saveNewMessage.rejected, (state, action) => {
        state.isLoading = false
        state.isSendingMessage = false
        state.errMessage = action.payload.errMessage
      })
  },
})

export const currentConverActions = {
  switchCurrentConver,
  saveNewMessage,
  ...currentConverSlice.actions,
}

export default currentConverSlice.reducer
