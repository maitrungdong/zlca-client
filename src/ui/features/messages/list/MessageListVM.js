import { useCurrentConver, useMessagesOfCC } from 'ui/hooks'
import messagesManager from 'managers/MessagesManager.js'
import { useEffect } from 'react'

export default function MessageListVM() {
  const currentConver = useCurrentConver()
  const messages = useMessagesOfCC()

  useEffect(() => {
    const getMessages = async () => {
      await messagesManager.loadMessagesOfConver(currentConver.id)
    }
    if (messages.length <= 0) {
      getMessages()
    }
  }, [messages?.length, currentConver?.id])

  return {
    messages,
  }
}
