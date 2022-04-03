import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  conversations: [],

  isLoading: false,
  errMessage: null,
}

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    wsConnect(state, action) {},
    wsConnected(state, action) {},
    wsDisconnect(state, action) {},
    wsDisconnected(state, action) {},
  },
})

export const socketActions = {
  ...socketSlice.actions,
}

export default socketSlice.reducer
