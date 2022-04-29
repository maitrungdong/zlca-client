import { reduxStore } from './redux/reduxStore.js'
import { conversActions } from './redux/slices/conversSlice.js'

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
  getConversOfUserFailed(errMessage) {
    reduxStore.dispatch(conversActions.getConversOfUserRejected(errMessage))
  }

  switchCurrentConverLoading() {
    reduxStore.dispatch(conversActions.switchCurrConverPending())
  }
  switchCurrentConverSuccess(converId, newConvers) {
    reduxStore.dispatch(
      conversActions.switchCurrConverFulfilled({ converId, newConvers })
    )
  }
  switchCurrentConverFailed(errMessage) {
    reduxStore.dispatch(conversActions.switchCurrConverRejected({ errMessage }))
  }

  getCurrentConverId() {
    return reduxStore.getState().convers.currentId
  }

  getCurrentConver() {
    const currConverId = this.getCurrentConverId()
    return reduxStore
      .getState()
      .convers.convers.find((c) => c.id === currConverId)
  }

  getConversFromStore() {
    return reduxStore.getState().convers.convers
  }

  getReceiverOfConver(senderId) {
    const currentConver = this.getCurrentConver()
    const receiver = currentConver.members.find((mem) => mem.id !== senderId)
    return receiver
  }

  updateConver(conver) {
    reduxStore.dispatch(conversActions.updateConver({ conver }))
  }
}

const conversStore = new ConversStore()
export default conversStore
