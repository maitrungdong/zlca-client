import { reduxStore } from '../reduxStore.js'
import { conversActions } from '../slices/conversSlice.js'

class ConversStore {
  subscribeToConversState(callback) {
    reduxStore.subscribe(() => {
      callback(reduxStore.getState().conversations)
    })
  }
  getConversOfUserPending() {
    reduxStore.dispatch(conversActions.getConversOfUserPending())
  }
  getConversOfUserFulfilled(conversations) {
    reduxStore.dispatch(
      conversActions.getConversOfUserFulFilled({ conversations })
    )
  }
  getConversOfUserRejected() {
    reduxStore.dispatch(conversActions.getConversOfUserRejected())
  }
}

const conversStore = new ConversStore()
export default conversStore
