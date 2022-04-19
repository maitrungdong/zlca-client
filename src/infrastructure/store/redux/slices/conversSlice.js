import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  convers: [],
  current: null,

  isLoading: false,
  errMessage: null,
}

const conversSlice = createSlice({
  name: 'convers',
  initialState,
  reducers: {
    getConversOfUserPending(state, action) {
      state.isLoading = true
    },
    getConversOfUserFulFilled(state, action) {
      state.convers = action.payload.conversations
      state.isLoading = false
    },
    getConversOfUserRejected(state, action) {
      state.isLoading = false
      state.errMessage = action.payload.errMessage
    },
    switchCurrConverPending(state, action) {
      state.isLoading = true
    },
    switchCurrConverFulfilled(state, action) {
      console.log({ switchCurrConverFulfilled: action.payload.currentConver })
      state.isLoading = false
      state.current = action.payload.currentConver
    },
    switchCurrConverRejected(state, action) {
      state.isLoading = false
      state.errMessage = action.payload.errMessage
    },
  },
})

export const conversActions = {
  ...conversSlice.actions,
}

export default conversSlice.reducer
