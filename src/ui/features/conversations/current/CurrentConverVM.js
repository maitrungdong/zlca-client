import messagesManager from 'managers/MessagesManager.js'

import { useCurrentConver, useMe } from 'ui/hooks'

import { messageType } from 'utils/constants'

const CurrentConverVM = () => {
  const me = useMe()
  const currentConver = useCurrentConver()

  const sendMessage = async (msgTextContent) => {
    if (msgTextContent.trim() !== '') {
      const newMessage = {
        conversationId: currentConver.id,
        senderId: me.id,
        messageType: messageType.TEXT,
        textContent: msgTextContent.trim(),
      }

      await messagesManager.saveNewMessage(newMessage)
    }
  }

  return {
    currentConver,
    sendMessage,
  }
}

export default CurrentConverVM
