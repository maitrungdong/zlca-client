import { reduxStore } from '../reduxStore.js'
import { messagesActions } from '../slices/messagesSlice.js'

/**
 * STORE: là một interface chung cho các state management tool.
 * Khi thay thế các state management tool khác thì ta chỉ cần tạo ra một store implementation
 * mới đối với state management tool đó.
 */

/** [TODO]: Store is powered by Redux. Store này dùng để quản lý (operations)
 * các in-memory data liên quan đến messages.
 */
class MessagesStore {
  /** [ISSUES]:
   * Chúng ta thấy ở đây thì có một hàm subscribe để gọi các call back mà subscribe
   * vào messageStore của chúng ta. Và hiện tại ta chưa sử dụng các thằng này vì ta
   * đã gắn cơ chế subscribe vào thẳng reduxStore trong (useCustomSelector). -> Điều này,
   * khá là toang!!! Chúng ta phải sửa lại. -> Sửa lại cơ chế subscribe(listen) (event-listener)
   * lại để đạt được Separation Of Concerns tốt hơn!!! Tầng Presentation không nên biết
   * về cụ thể một redux hay một state management tool nào khác!!! Chúng ta cũng sẽ viết lại
   * cơ chế observe khác tốt hơn!! Học hỏi từ đây:
   * https://github.com/reduxjs/redux/issues/303
   */
  subscribeToMessagesState(callback) {
    reduxStore.subscribe(() => {
      callback(reduxStore.getState().messages)
    })
  }

  /** [ISSUES]: texted from MTD~
   * Khi ta viết một function get, update hay một hành động nào đó liên quan đến việc
   * lưu trữ dữ liệu bên phía BE thì lúc nào ta cũng phải viết ra 3 function:
   * pending, fulfilled, reject...
   * Trong khi đó, mục tiêu chính của chúng ta là cái fulfilled hay chính xác hơn là
   * có hoặc không có data?
   * Còn việc pending hay có xuất hiện lỗi trong quá trình get/update.
   * Nó đã là một chuyện khác! Bởi vì, không phải một lệnh get/update nào ta cũng cần phải
   * listen việc loading or thông báo lỗi (BÊN UI)...
   * Ngoài ra, nó còn không giúp cho code của chúng ta DRY(Don't repeat yourself)!!!
   * Vì thế, sẽ cần có một slice, hay store khác để quản lý việc loading và thông báo lỗi!
   * Bên trong repository (nơi trung tâm của các hoạt động liên quan đến data) sẽ
   * chịu trách nhiệm xem liệu nó có nên dispatch một action liên quan đến error hay không?
   * Ví dụ, nó sẽ đợi cho thằng APIDataSource cố gắng retry lại một vài lần... sau đó,
   * mới quyết định dispatch action đó (action lỗi).
   * => Chúng ta sẽ cần phải có một solution khác ở đây.
   * */
  getMessagesOfConverLoading() {
    reduxStore.dispatch(messagesActions.getMessagesOfConverPending())
  }
  saveMessagesOfConverToStore({ converId, messages }) {
    reduxStore.dispatch(
      messagesActions.getMessagesOfConverFulfilled({
        converId,
        messages,
      })
    )
  }
  getMessagesOfConverFailed(errMessage) {
    reduxStore.dispatch(
      messagesActions.getMessagesOfConverRejected({ errMessage })
    )
  }

  getMessagesOfConverFromStore(converId) {
    return reduxStore
      .getState()
      .messages.messagesOfConvers.find((m) => m.converId === converId)
  }

  saveNewMessageLoading() {
    reduxStore.dispatch(messagesActions.saveNewMessagePending())
  }
  saveNewMessageSuccess(newMessage) {
    reduxStore.dispatch(
      messagesActions.saveMessageFulfilled({
        newMessage: newMessage,
      })
    )
  }
  saveNewMessageFailed(errMessage) {
    reduxStore.dispatch(messagesActions.saveNewMessageRejected({ errMessage }))
  }
  saveArrivalMessage(arrivalMessage) {
    reduxStore.dispatch(messagesActions.saveArrivalMessage({ arrivalMessage }))
  }
}

const messagesStore = new MessagesStore()
export default messagesStore
