import conversAPIDataSource from 'infrastructure/api/conversAPIDataSource'
import currentConverStore from 'infrastructure/store/redux/stores/CurrentConverStore'
import catchError from 'utils/catchError'

class CurrentConverRepository {
  async saveNewMessage(newMessage) {
    try {
      currentConverStore.saveNewMessagePending()
      const res = await conversAPIDataSource.saveNewMessage(newMessage)
      if (res.success) {
        currentConverStore.saveNewMessageFulfilled(res.data)
      } else {
        throw new Error(res.message)
      }
    } catch (err) {
      const errMessage = catchError(err)
      currentConverStore.saveNewMessageRejected(errMessage)
    }
  }

  async switchCurrentConver(newCurrentConver) {
    try {
      currentConverStore.switchCurrentConverPending()
      const res = await conversAPIDataSource.getMessages(newCurrentConver.id)
      if (res.success) {
        currentConverStore.switchCurrentConverFulfilled({
          current: newCurrentConver,
          messagesOfConver: res.data.messagesOfConver,
        })
      } else {
        throw new Error(res.message)
      }
    } catch (err) {
      const errMessage = catchError(err)
      currentConverStore.switchCurrentConverRejected(errMessage)
    }
  }

  saveArrivalMessage(arrivalMessage) {
    currentConverStore.saveArrivalMessage(arrivalMessage)
  }
}

const currentConverRepository = new CurrentConverRepository()
export default currentConverRepository
