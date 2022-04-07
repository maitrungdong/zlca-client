import { reduxStore } from '../reduxStore.js'
import { conversActions } from '../slices/conversSlice.js'

class ConversStore {
  subscribeToConversState(callback) {
    reduxStore.subscribe(() => {
      callback(reduxStore.getState().conversations)
    })
  }
  getConversOfUser(userId) {
    reduxStore.dispatch(conversActions.getConversOfUser(userId))
  }
}

const conversStore = new ConversStore()
export default conversStore
