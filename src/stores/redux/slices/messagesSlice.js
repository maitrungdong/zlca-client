import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  messages: [],

  isLoading: false,
  isSendingMsg: false,
  errMessage: null,
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    getMessagesOfConverPending(state, action) {
      state.isLoading = true
      state.errMessage = null
    },
    getMessagesOfConverFulfilled(state, action) {
      state.messages = action.payload.messages

      state.isLoading = false
    },
    getMessagesOfConverRejected(state, action) {
      state.isLoading = false
      state.errMessage = action.payload.errMessage
    },
    saveArrivalMessage(state, action) {
      state.messages.push(action.payload.arrivalMessage)
    },
    saveNewMessagePending(state, action) {
      state.isSendingMsg = true
      state.errMessage = null
    },
    saveMessageFulfilled(state, action) {
      state.messages.push(action.payload.newMessage)
      state.isSendingMsg = false
    },
    saveNewMessageRejected(state, action) {
      state.isSendingMsg = false
      state.errMessage = action.payload.errMessage
    },
  },
})

export const messagesActions = {
  ...messagesSlice.actions,
}

export default messagesSlice.reducer
