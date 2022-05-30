//stores:
import authStore from 'stores/AuthStore.js'
import messagesStore from 'stores/MessagesStore.js'
import conversStore from 'stores/ConversationsStore.js'

//use cases:
import getMessagesOfConverUseCase from 'usecases/messages/GetMessagesOfConver.js'
import saveNewMessageUseCase from 'usecases/messages/SaveNewMessage.js'
import saveArrivalMessageUseCase from 'usecases/messages/SaveArrivalMessage.js'

//other managers:
import conversManager from './ConversManager.js'

import { messageType } from 'utils/constants.js'

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

      const res = await getMessagesOfConverUseCase.invoke({ converId })

      //[TODO]: chuẩn hóa các message
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
      //debugger
      messagesStore.saveNewMessageLoading()

      if (msg.images && msg.images.length > 0) {
        msg.messageType = messageType.IMAGE
      } else if (msg.link) {
        msg.messageType = messageType.LINK
      } else {
        msg.messageType = messageType.TEXT
      }

      const receiver = conversStore.getReceiverOfConver(msg.senderId)

      const res = await saveNewMessageUseCase.invoke(
        {
          newMessage: msg,
          receiverId: receiver.id,
        },
        {
          shouldNotify: true,
        }
      )

      const newMessage = this.standardMessage(res)
      messagesStore.saveNewMessageSuccess(newMessage)

      conversManager.changeLastMessageOfConver(newMessage)
    } catch (err) {
      messagesStore.saveNewMessageFailed(err.message)
    }
  }

  async saveArrivalMessage({ arrivalMessage }) {
    const currentConverId = conversStore.getCurrentConverId()

    const standardedMsg = this.standardMessage(arrivalMessage)
    if (arrivalMessage.conversationId === currentConverId) {
      messagesStore.saveArrivalMessage(standardedMsg)
    }

    conversManager.changeLastMessageOfConver(standardedMsg)
  }
}

const messagesManager = new MessagesManager()

saveArrivalMessageUseCase.addListener(
  messagesManager.saveArrivalMessage.bind(messagesManager)
)

export default messagesManager
