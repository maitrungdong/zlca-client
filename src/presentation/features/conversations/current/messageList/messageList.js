import React from 'react'

import Message from './Message'
import Scrollbars from 'react-custom-scrollbars-2'

const MessageList = ({ messages }) => {
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
