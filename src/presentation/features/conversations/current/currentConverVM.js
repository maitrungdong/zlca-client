import SaveNewMessage from 'domain/usecases/CurrentConver/SaveNewMessage'
import currentConverRepository from 'infrastructure/repositories/CurrentConverRepository'

import {
  useMe,
  useCurrentConver,
  useOtherMembersOfCU,
  useMessagesOfCU,
} from 'presentation/hooks'

import { messageType } from 'utils/constants'

const CurrentConverViewModel = () => {
  const friend = useOtherMembersOfCU()
  const messages = useMessagesOfCU()
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

    if (messages && messages.length > 0) {
      currentConver.messages = messages.map((m) => {
        return {
          ...m,
          isMe: m.senderId === me.id,
        }
      })
    } else {
      currentConver.messages = []
    }
  }

  const sendMessage = async (msgTextContent) => {
    if (msgTextContent.trim() !== '') {
      const newMessage = {
        conversationId: currentConver.id,
        senderId: me.id,
        messageType: messageType.TEXT,
        textContent: msgTextContent.trim(),
      }

      const uc = new SaveNewMessage(currentConverRepository)
      await uc.invoke(newMessage)
    }
  }

  return {
    currentConver,
    sendMessage,
  }
}

export default CurrentConverViewModel
