import messagesStore from 'infrastructure/store/redux/stores/MessagesStore.js'
import messagesAPIDataSource from 'infrastructure/api/messagesAPIDataSource.js'
import catchError from 'utils/catchError'

/**
 * [REPOSITORY]: là nơi trung tâm để quản lý các operation liên quan đến dữ liệu.
 * ví dụ: conversations, messages hay currConversation...
 * Nó sẽ nằm ở tầng infrastructure. Tầng infrastructure là tầng chịu trách nhiệm cho việc
 * giao tiếp với:
 * 1. BE (thông qua giao thức HTTP)
 * 2. Lưu trữ local data, ví dụ: sử dụng localStorage hay indexedDB...
 * 3. Store (State management - cache): vuex, redux, mobx,...
 */

/** [TODO]: Quản lý data liên quan đến messages.
 * ... Flow để lấy data: Cache (store) -> DB -> Network.
 */
class MessagesRepository {
  async getMessagesOfConver(converId) {
    try {
      /** [ISSUES]: Xuất hiện một vấn đề khi coi Redux là nơi để cache dữ liệu~
       * Redux có thực sự là một nơi để caching dữ liệu?
       * Hãy phân biệt giữa client state management (client state manager)
       * với server state management (server state manager - caching).
       * Bây giờ mình cứ tạm coi Redux (tức là store của chúng ta có thể caching dữ liệu đi!)
       * Mình sẽ đào bới lại vấn đề này sau...
       */
      /**
       * Kiểm tra trong cache coi có hay không!!!
       * Làm sao để kiểm tra? Thì đương nhiên phải chọc vào cache (hay một
       * store nào đó đang lưu trữ nó, trường hợp này là messagesStore).
       * Nhưng chúng ta đang gặp một vấn đề đó là:
       * Cái dữ liệu trong store của chúng ta maybe đang có một chỗ nào đó lắng nghe
       * Nhưng, cache lại bị full... Sau đó, mình thay thế dữ liệu trong cache --> Boombs...
       * Toang ngay!!! Vậy thì không ổn chút nào.
       */

      //Dispatch loading action khi fetching data từ network.
      //Note: Đây không có gắn chặt vào redux store.
      //Chúng ta đang sử một interface chung là messagesStore, còn bên trong đó sử dụng redux hay...
      //ta không quan tâm. Chúng ta chỉ đang báo là việc get messages đang pending cho store của chúng ta.
      messagesStore.getMessagesOfConverLoading()

      /**
       * Steps: Để quyết định lấy messages of conver từ đâu?
       * 1. Kiểm tra xem trong store (cache) mình có messages of conver này hay không?
       * 2. Nếu có, thì lấy lên và sử dụng.
       * 3. Nếu không có, thì lấy từ DB.
       * 4. Nếu không có nữa, thì mới lấy từ API.
       */
      let res = messagesStore.getMessagesOfConverFromStore(converId)
      if (res) return
      res = await messagesAPIDataSource.getMessagesOfConver(converId)
      if (res.success) {
        //Sau khi có dữ liệu, ta sẽ lưu dữ liệu vào trong store (cache).
        messagesStore.saveMessagesOfConverToStore({
          converId: converId,
          messages: res.data.messagesOfConver,
        })
      } else {
        throw new Error(res.message)
      }
    } catch (err) {
      const errMessage = catchError(err)
      //Khi có lỗi xảy ra, ta sẽ dispatch một action để lưu lại message lỗi.
      messagesStore.getMessagesOfConverFailed(errMessage)
    }
  }

  async saveNewMessage(newMessage) {
    try {
      messagesStore.getMessagesOfConverLoading()
      let res = await messagesAPIDataSource.saveNewMessage(newMessage)
      if (res.success) {
        messagesStore.saveNewMessageSuccess(newMessage)
      } else {
        throw new Error(res.message)
      }
    } catch (err) {
      const errMessage = catchError(err)
      messagesStore.saveNewMessageFailed(errMessage)
    }
  }
}

const messagesRepository = new MessagesRepository()
export default messagesRepository
