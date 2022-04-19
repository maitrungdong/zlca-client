import { reduxStore } from '../reduxStore.js'
import { conversActions } from '../slices/conversSlice.js'

//Đọc thêm các comment bên MessagesStore để rõ hơn.
class ConversStore {
  subscribeToConversState(callback) {
    reduxStore.subscribe(() => {
      callback(reduxStore.getState().conversations)
    })
  }
  getConversOfUserLoading() {
    reduxStore.dispatch(conversActions.getConversOfUserPending())
  }
  saveConversOfUserToStore(conversations) {
    reduxStore.dispatch(
      conversActions.getConversOfUserFulFilled({ conversations })
    )
  }
  getConversOfUserFailed() {
    reduxStore.dispatch(conversActions.getConversOfUserRejected())
  }

  getConversOfUserFromStore() {
    return reduxStore.getState().convers.convers
  }

  switchCurrentConverLoading() {
    reduxStore.dispatch(conversActions.switchCurrConverPending())
  }
  switchCurrentConverSuccess(currentConver) {
    reduxStore.dispatch(
      conversActions.switchCurrConverFulfilled({ currentConver })
    )
  }
  switchCurrentConverFailed(errMessage) {
    reduxStore.dispatch(conversActions.switchCurrConverRejected({ errMessage }))
  }
}

const conversStore = new ConversStore()
export default conversStore
