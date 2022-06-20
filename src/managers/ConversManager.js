import conversStore from 'stores/ConversationsStore.js'
import authStore from 'stores/AuthStore.js'

import getConversOfUserUseCase from 'usecases/convers/GetConversOfUser.js'
import chatWithUserUseCase from 'usecases/convers/ChatWithUser.js'
import saveArrivalConverUseCase from 'usecases/convers/SaveArrivalConver.js'

import messagesManager from './MessagesManager.js'
import { messageType } from 'utils/constants.js'

class ConversManager {
  //[TODO]: Chuẩn hóa business data lấy từ Repo thành data cho UI.
  standardConver(conver) {
    //[TODO]: Lấy thông tin của conversation hiện tại và người dùng đang đăng nhập.
    const currentConverId = conversStore.getCurrentConverId()
    const me = authStore.getMe()

    const friend = conver.members.find((mem) => mem.id !== me.id)

    const converTitle =
      conver.title ||
      (friend && friend.fullName ? friend.fullName : 'Cuộc trò chuyện')

    const lastMessageTitle = this.standardLastMessageTitle(conver)

    return {
      id: conver.id,
      avatar: friend.avatar,
      title: converTitle,
      isCurrentConver: conver.id === currentConverId,
      members: conver.members,
      lastMessage: conver.lastMessage,
      lastMessageTitle: lastMessageTitle,
      updatedAt: conver.updatedAt,
      createdAt: conver.createdAt,
    }
  }

  //[TODO]: Chuẩn hóa data UI phức tạp cho lastMessageTitle
  standardLastMessageTitle(conver) {
    const me = authStore.getMe()

    let lastMessageTitle = ''
    if (!conver.lastMessage) {
      lastMessageTitle = '[Bắt đầu trò chuyện]'
    } else {
      if (conver.lastMessage.senderId === me.id) {
        lastMessageTitle = 'Bạn: '
      }
      if (conver.lastMessage.messageType === messageType.TEXT) {
        lastMessageTitle += conver.lastMessage.textContent
      } else if (conver.lastMessage.messageType === messageType.LINK) {
        lastMessageTitle += '[LINK]'
      } else {
        lastMessageTitle += '[HÌNH ẢNH]'
      }
    }

    return lastMessageTitle
  }

  //[TODO]: Lấy các conversation của user hiện tại.
  async loadConversOfUser(userId) {
    try {
      conversStore.getConversOfUserLoading()

      const res = await getConversOfUserUseCase.invoke({ userId })

      //[TODO]: Chuẩn hóa data.
      const convers = (res || []).map((c) => {
        return this.standardConver(c)
      })

      //[TODO]: Data đã được chuẩn hóa vào trong redux store.
      conversStore.saveConversOfUserToStore(convers)
    } catch (err) {
      console.log({ err })
      conversStore.getConversOfUserFailed(err.message)
    }
  }

  async switchCurrentConver(converId) {
    try {
      conversStore.switchCurrentConverLoading()

      //[TODO]: Sử dụng lại messagesManager để load
      //các message của conver này.
      messagesManager.loadMessagesOfConver(converId)

      //[TODO]: Sau khi thay đổi cái conversation hiện tại, thì ta phải
      //thay đổi lại thuộc tính isCurrentConver trong store.
      const oldConvers = conversStore.getConversFromStore()
      const newConvers = oldConvers.map((c) => {
        return {
          ...c,
          isCurrentConver: c.id === converId,
        }
      })
      conversStore.switchCurrentConverSuccess(converId, newConvers)
    } catch (err) {
      conversStore.switchCurrentConverFailed(err.message)
    }
  }

  //[TODO]: Update synchronously lastMessage of a conversation
  changeLastMessageOfConver(lastMessage) {
    const convers = conversStore.getConversFromStore()
    const conver = convers.find((c) => c.id === lastMessage.conversationId)

    if (conver) {
      const clonedConver = { ...conver }
      clonedConver.lastMessage = lastMessage
      clonedConver.lastMessageTitle =
        this.standardLastMessageTitle(clonedConver)
      conversStore.updateConver(clonedConver)
    }
  }

  async chatWithUser(user) {
    try {
      const me = authStore.getMe()
      //TODO: Gửi lên server để hoặc tạo một conversation mới hoặc trả về conversation đó!
      const res = await chatWithUserUseCase.invoke(
        { members: [me, user], receiverId: user.id },
        { shouldNotify: true }
      )

      if (res.isOld) {
        this.switchCurrentConver(res.conver.id)
      } else {
        //TODO: Thêm vào cuối danh sách conversation mới (nếu có).
        //TODO: Switch sang conversation đó.
        this.saveNewConver(res.conver)
        this.switchCurrentConver(res.conver.id)
      }
    } catch (err) {
      console.log(err)
    }
  }

  async saveNewConver(conver) {
    const standardedConver = this.standardConver(conver)
    conversStore.saveNewConver(standardedConver)
  }

  async saveArrivalConver({ arrivalConver }) {
    const standardedConver = this.standardConver(arrivalConver)
    conversStore.saveArrivalConver(standardedConver)
  }
}

const conversManager = new ConversManager()
saveArrivalConverUseCase.addListener(
  conversManager.saveArrivalConver.bind(conversManager)
)

export default conversManager
