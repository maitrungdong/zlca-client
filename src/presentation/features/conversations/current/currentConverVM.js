import SaveNewMessage from 'domain/usecases/Messages/SaveNewMessage'
import messagesRepository from 'infrastructure/repositories/MessagesRepository'

import {
  useMe,
  useCurrentConver,
  useOtherMembersOfCU,
} from 'presentation/hooks'

import { messageType } from 'utils/constants'

const CurrentConverVM = () => {
  const friend = useOtherMembersOfCU()
  const me = useMe()

  const c = useCurrentConver()
  const currentConver = Object.assign({}, c)

  if (currentConver) {
    if (!currentConver.title) {
      if (friend?.fullName) {
        currentConver.title = friend.fullName
      } else {
        currentConver.title = 'Cuộc trò chuyện'
      }
    }

    currentConver.lastActivity = friend?.isOnline
      ? 'Đang online'
      : friend?.lastOnline

    // if (messages && messages.length > 0) {
    //   currentConver.messages = messages.map((m) => {
    //     return {
    //       ...m,
    //       isMe: m.senderId === me.id,
    //     }
    //   })
    // } else {
    //   currentConver.messages = []
    // }
  }

  const sendMessage = async (msgTextContent) => {
    if (msgTextContent.trim() !== '') {
      const newMessage = {
        conversationId: currentConver.id,
        senderId: me.id,
        messageType: messageType.TEXT,
        textContent: msgTextContent.trim(),
      }

      const uc = new SaveNewMessage(messagesRepository)
      await uc.invoke(newMessage)
    }
  }

  return {
    currentConver,
    sendMessage,
  }
}

export default CurrentConverVM
