import authStore from 'stores/AuthStore'
import messagesStore from 'stores/MessagesStore.js'
import GetMessagesOfConver from 'usecases/messages/GetMessagesOfConver.js'
import SaveNewMessage from 'usecases/messages/SaveNewMessage'
import messagesRepository from 'data/repositories/MessagesRepository'
import conversManager from './ConversManager'
import conversStore from 'stores/ConversationsStore.js'

class MessagesManager {
  standardMessage(msg) {
    const me = authStore.getMe()

    return {
      id: msg.id,
      conversationId: msg.conversationId,
      isMe: msg.senderId === me.id,
      messageType: msg.messageType,
      repliedMessageId: msg.repliedMessageId,
      senderId: msg.senderId,
      sender: msg.sender,
      senderAvatar: msg.sender.avatar,
      textContent: msg.textContent,
      link: msg.link,
      images: msg.images,
      createdAt: msg.createdAt,
      updatedAt: msg.updatedAt,
    }
  }

  async loadMessagesOfConver(converId) {
    try {
      messagesStore.getMessagesOfConverLoading()

      const uc = new GetMessagesOfConver(messagesRepository)
      const res = await uc.invoke(converId)

      //[TODO]: Chuẩn hóa messages
      const messages = (res || []).map((m) => {
        return this.standardMessage(m)
      })
      messagesStore.saveMessagesOfConverToStore(messages)
    } catch (err) {
      messagesStore.getMessagesOfConverFailed(err.message)
    }
  }

  async saveNewMessage(msg) {
    try {
      messagesStore.saveNewMessageLoading()

      const receiver = conversStore.getReceiverOfConver(msg.senderId)
      const uc = new SaveNewMessage(messagesRepository)
      const res = await uc.invoke(msg, receiver.id)

      const newMessage = this.standardMessage(res)
      messagesStore.saveNewMessageSuccess(newMessage)

      //[TODO]: Khi có tin nhắn mới thì lastMessage của một conver nào đó
      //sẽ phải thay đổi.
      conversManager.changeLastMessageOfConver(newMessage)
    } catch (err) {
      messagesStore.saveNewMessageFailed(err.message)
    }
  }

  async saveArrivalMessage(arrivalMsg) {
    try {
      const arrivalMessage = this.standardMessage(arrivalMsg)
      messagesStore.saveArrivalMessage(arrivalMessage)

      //[TODO]: Khi có tin nhắn đến thì lastMessage của một conver nào đó
      //sẽ phải thay đổi.
      conversManager.changeLastMessageOfConver(arrivalMessage)
    } catch (err) {}
  }
}

const messagesManager = new MessagesManager()
export default messagesManager
