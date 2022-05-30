import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  convers: [],
  currentId: null,

  isLoading: false,
  errMessage: null,
}

const conversSlice = createSlice({
  name: 'convers',
  initialState,
  reducers: {
    getConversOfUserPending(state, action) {
      state.isLoading = true
      state.errMessage = null
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
      state.errMessage = null
    },
    switchCurrConverFulfilled(state, action) {
      state.currentId = action.payload.converId
      state.convers = action.payload.newConvers

      state.isLoading = false
    },
    switchCurrConverRejected(state, action) {
      state.isLoading = false
      state.errMessage = action.payload.errMessage
    },
    updateConver(state, action) {
      const { conver } = action.payload
      state.convers = state.convers.map((c) => {
        if (c.id === conver.id) return conver
        else return c
      })
    },
    saveNewConver(state, action) {
      state.convers.push(action.payload.newConver)
    },
    saveArrivalConver(state, action) {
      state.convers.push(action.payload.arrivalConver)
    },
  },
})

export const conversActions = {
  ...conversSlice.actions,
}

export default conversSlice.reducer
