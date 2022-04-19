import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  //Caching một số message list của các conversation!
  //Caching schema thì hiện tại chưa nghĩ ra!
  //Một kĩ thuật đơn giản, nếu không có
  //thì fetch từ BE và gắn vào phía đuôi (max 10 message list).
  //Còn nếu có thì lấy ra xài thôi!
  //Khoan!! Chúng ta đừng nhầm lẫn giữa application state và cached data!
  //Nếu chúng ta coi redux là nơi để cache dữ liệu thì khá là nguy hiểm, đúng không?
  messagesOfConvers: [],

  //Cái này chuẩn bị bỏ đi!!! Quá xàm khi để ở đây.
  isLoading: false,
  errMessage: null,
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    getMessagesOfConverPending(state, action) {
      state.isLoading = true
    },
    getMessagesOfConverFulfilled(state, action) {
      console.log({ getMessagesOfConverFulfilled: action.payload })
      const { converId, messages } = action.payload
      const msgOfConver = state.messagesOfConvers.find(
        (m) => m.converId === converId
      )
      if (msgOfConver) {
        msgOfConver.messages = messages
      } else {
        if (state.messagesOfConvers.length >= 10) {
          state.messagesOfConvers.unshift()
        }
        state.messagesOfConvers.push({
          converId,
          messages,
        })
      }

      state.isLoading = false
      state.errMessage = null
    },
    getMessagesOfConverRejected(state, action) {
      state.isLoading = false
      state.errMessage = action.payload.errMessage
    },
    saveArrivalMessage(state, action) {
      const { arrivalMessage } = action.payload
      const messagesOfConver = state.messagesOfConvers.find(
        (m) => m.converId === arrivalMessage.conversationId
      )
      if (messagesOfConver) {
        messagesOfConver.messages.push(arrivalMessage)
      }
    },
    saveNewMessagePending(state, action) {
      state.isLoading = true
    },
    saveMessageFulfilled(state, action) {
      const { newMessage } = action.payload
      const messagesOfConver = state.messagesOfConvers.find(
        (m) => m.converId === newMessage.conversationId
      )
      if (messagesOfConver) {
        messagesOfConver.messages.push(newMessage)
      }
      state.isLoading = false
    },
    saveNewMessageRejected(state, action) {
      state.isLoading = false
      state.errMessage = action.payload.errMessage
    },
  },
})

export const messagesActions = {
  ...messagesSlice.actions,
}

export default messagesSlice.reducer
