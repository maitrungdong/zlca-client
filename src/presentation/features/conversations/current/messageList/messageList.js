import React, { useEffect } from 'react'

import Message from './Message'
import Scrollbars from 'react-custom-scrollbars-2'

import useMessageListVM from './MessageListVM'

const MessageList = () => {
  const { messages, getMessages } = useMessageListVM()

  useEffect(() => {
    if (messages.length <= 0) {
      getMessages()
    }
  }, [])

  return (
    <div className="message-list">
      <Scrollbars>
        {messages.map((m) => {
          return <Message key={m.id} message={m} />
        })}
      </Scrollbars>
    </div>
  )
}

export default MessageList
