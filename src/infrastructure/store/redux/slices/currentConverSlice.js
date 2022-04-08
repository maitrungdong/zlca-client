import { createSlice } from '@reduxjs/toolkit'

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
    switchCurrentConverPending(state, action) {
      state.isLoading = true
    },
    switchCurrentConverFulfilled(state, action) {
      state.isLoading = false
      state.current = action.payload.currentConver
      state.members = action.payload.currentConver.members
      state.messages = action.payload.messagesOfConver
    },
    switchCurrentConverRejected(state, action) {
      state.isLoading = false
      state.errMessage = action.payload.errMessage
    },
    saveNewMessagePending(state, action) {
      state.isLoading = true
      state.isSendingMessage = true
    },
    saveNewMessageFulfilled(state, action) {
      state.messages.push(action.payload.newMessage)
      state.isLoading = false
      state.isSendingMessage = false
    },
    saveNewMessageRejected(state, action) {
      state.isLoading = false
      state.isSendingMessage = false
      state.errMessage = action.payload.errMessage
    },
  },
})

export const currentConverActions = {
  ...currentConverSlice.actions,
}

export default currentConverSlice.reducer
