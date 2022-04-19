import conversStore from 'infrastructure/store/redux/stores/ConversationsStore.js'
import conversAPIDataSource from 'infrastructure/api/conversAPIDataSource.js'

import catchError from 'utils/catchError'
import messagesRepository from './MessagesRepository'

//Đọc từ MessagesRepository để hiểu rõ hơn.
class ConversRepository {
  async getConversOfUser(userId) {
    try {
      conversStore.getConversOfUserLoading()
      let res = conversStore.getConversOfUserFromStore()
      if (res.length > 0) return
      res = await conversAPIDataSource.getConversOfUser(userId)
      if (res.success) {
        conversStore.saveConversOfUserToStore(res.data.conversations)
      } else {
        throw new Error(res.message)
      }
    } catch (err) {
      const errMessage = catchError(err)
      conversStore.getConversOfUserFailed(errMessage)
    }
  }

  async switchCurrentConver(currentConver) {
    try {
      /** [ISSUES]: Khi viết như vầy, ta sẽ không thể viết được theo kiểu transaction...
       * Ta không biết liệu hành động getMessages này liệu có thành công hay không?
       * Để rồi sau đó, ta sẽ báo cho conversStore rằng hãy switch current conver này thành công r!!!
       * -> Nghĩ ra một solution khác để fix lại hoặc... phải refactor lại chỗ này nếu
       * nghĩ đến vấn đề scaling. -> Không thể nhầm lẫn giữa client side state
       * với server side state được (state của app khác với state bên server)
       */

      //Khi ta switch conver hiện tại, thì ta phải fetch messages (nếu cần thiết)
      //về trong redux.
      await messagesRepository.getMessagesOfConver(currentConver.id)
      conversStore.switchCurrentConverSuccess(currentConver)
    } catch (err) {
      const errMessage = catchError(err)
      conversStore.switchCurrentConverFailed(errMessage)
    }
  }
}

const conversRepository = new ConversRepository()
export default conversRepository
