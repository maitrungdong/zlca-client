import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import conversationsService from '@api/conversationsService.js'

const fetchAllMessages = createAsyncThunk(
  'currentConver/fetchAllMessages',
  async (currentConver, thunkAPI) => {
    try {
      const res = await conversationsService.getAllMessages(currentConver.id)
      if (res.success) {
        return {
          currentConver,
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
    setCurrentChatBox(state, action) {},
    saveArrivalMessage(state, action) {
      state.messages.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMessages.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchAllMessages.fulfilled, (state, action) => {
        state.currentConver = action.payload.currentConver
        state.members = action.payload.currentConver.members
        state.messages = action.payload.messagesOfConver
        state.isLoading = false
      })
      .addCase(fetchAllMessages.rejected, (state, action) => {
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
  fetchAllMessages,
  saveNewMessageOfMe,
  ...currentConverSlice.actions,
}

export default currentConverSlice.reducer
