import React, { useEffect, useRef } from 'react'

import Message from '../components/Message'

import useMessageListVM from './MessageListVM'

const MessageList = () => {
  const { messages } = useMessageListVM()
  const messagesEndRef = useRef()

  useEffect(() => {
    messagesEndRef.current.scrollIntoView()
  }, [messages])

  return (
    <div className="message-list">
      {messages.map((m) => {
        return <Message key={m.id} message={m} />
      })}
      <div
        className="bottom-of-list"
        ref={(el) => (messagesEndRef.current = el)}
      ></div>
    </div>
  )
}

export default MessageList
