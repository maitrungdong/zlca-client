import React, { useEffect } from 'react'

import Message from './Message'
import Scrollbars from 'react-custom-scrollbars-2'

import { useSelectMessages } from 'application/services/hooks'

const ChatBox = () => {
  const messages = useSelectMessages()

  useEffect(() => {}, [messages])

  return (
    <div className="chat-box">
      <Scrollbars>
        {messages.map((m) => {
          return <Message key={m.id} message={m} />
        })}
      </Scrollbars>
    </div>
  )
}

export default ChatBox
