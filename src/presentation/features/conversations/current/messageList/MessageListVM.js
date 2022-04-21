import { useCurrentConver, useMessagesOfCC } from 'presentation/hooks'
import messagesManager from 'domain/managers/MessagesManager.js'

export default function MessageListVM() {
  const currentConver = useCurrentConver()

  const messages = useMessagesOfCC()
  const getMessages = async () => {
    await messagesManager.loadMessagesOfConver(currentConver.id)
  }

  return {
    messages,
    getMessages,
  }
}
