import { reduxStore } from '../reduxStore'
import { currentConverActions } from '../slices/currentConverSlice'

class CurrentConverStore {
  subscribeToCurrentConverState(callback) {
    reduxStore.subscribe(() => {
      callback(reduxStore.getState().currentConver)
    })
  }

  saveNewMessagePending() {
    reduxStore.dispatch(currentConverActions.saveNewMessagePending())
  }

  saveNewMessageFulfilled(newMessage) {
    reduxStore.dispatch(
      currentConverActions.saveNewMessageFulfilled({ newMessage })
    )
  }

  saveNewMessageRejected(errMessage) {
    reduxStore.dispatch(
      currentConverActions.saveNewMessageRejected({ errMessage })
    )
  }

  switchCurrentConverPending() {
    reduxStore.dispatch(currentConverActions.switchCurrentConverPending())
  }

  switchCurrentConverFulfilled(newCurrentConver) {
    reduxStore.dispatch(
      currentConverActions.switchCurrentConverFulfilled({
        currentConver: newCurrentConver.current,
        messagesOfConver: newCurrentConver.messagesOfConver,
      })
    )
  }

  switchCurrentConverRejected(errMessage) {
    reduxStore.dispatch(
      currentConverActions.switchCurrentConverRejected({ errMessage })
    )
  }

  saveArrivalMessage(arrivalMessage) {
    reduxStore.dispatch(currentConverActions.saveArrivalMessage(arrivalMessage))
  }
}

const currentConverStore = new CurrentConverStore()
export default currentConverStore
