import { reduxStore } from '../reduxStore'
import { currentConverActions } from '../slices/currentConverSlice'

class CurrentConverStore {
  subscribeToCurrentConverState(callback) {
    reduxStore.subscribe(() => {
      callback(reduxStore.getState().currentConver)
    })
  }

  saveNewMessage(newMessage) {
    reduxStore.dispatch(currentConverActions.saveNewMessage(newMessage))
  }

  switchCurrentConver(newCurrentConver) {
    reduxStore.dispatch(
      currentConverActions.switchCurrentConver(newCurrentConver)
    )
  }

  saveArrivalMessage(arrivalMessage) {
    reduxStore.dispatch(currentConverActions.saveArrivalMessage(arrivalMessage))
  }
}

const currentConverStore = new CurrentConverStore()
export default currentConverStore
