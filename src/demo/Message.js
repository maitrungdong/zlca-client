import React from 'react'

import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
import vi from 'timeago.js/lib/lang/vi'
timeago.register('vi', vi)

const Message = ({ message }) => {
  return (
    <div className={`message ${message.senderId === 1 ? 'me' : ''}`}>
      <div
        className="message-sender-avatar"
        style={{ backgroundImage: `url(${message.avatar})` }}
      ></div>
      <div className="message-content">
        <div className="message-content__main">
          <h3 style={{ fontSize: '18px', fontWeight: '500' }}>
            Message index: {message.index}
          </h3>
          <TextMessage content={message.text} />
        </div>

        <div className="message-content__bottom">
          <span className="message-content__bottom-send-time"></span>
        </div>
      </div>
    </div>
  )
}

const TextMessage = (props) => {
  const { content } = props

  return (
    <textarea
      rows={4}
      cols={40}
      className="text-message"
      defaultValue={content}
    />
  )
}

export default Message
