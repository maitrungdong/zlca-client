import conversStore from 'infrastructure/store/redux/stores/ConversationsStore.js'
import conversAPIDataSource from 'infrastructure/api/conversAPIDataSource.js'
import catchError from 'utils/catchError'

class ConversRepository {
  async getConversOfUser(userId) {
    try {
      conversStore.getConversOfUserPending()
      const res = await conversAPIDataSource.getConversOfUser(userId)
      if (res.success) {
        conversStore.getConversOfUserFulfilled(res.data.conversations)
      } else {
        throw new Error(res.message)
      }
    } catch (err) {
      const errMessage = catchError(err)
      conversStore.getConversOfUserRejected(errMessage)
    }
  }
}

const conversRepository = new ConversRepository()
export default conversRepository
