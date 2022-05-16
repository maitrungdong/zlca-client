import React from 'react'

import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
import vi from 'timeago.js/lib/lang/vi'
timeago.register('vi', vi)

const Message = ({ message }) => {
  return (
    <div className={`message ${message.isMe ? 'me' : ''}`}>
      <div
        className="message-sender-avatar"
        style={{ backgroundImage: `url(${message.senderAvatar})` }}
      ></div>
      <div className="message-content">
        <div className="message-content__main">
          {message.images &&
            message.images.map((img) => {
              return (
                <img
                  key={img.id}
                  alt="hinh anh"
                  src={img.imageUrl}
                  style={{ height: '200px', marginRight: '0.8rem' }}
                />
              )
            })}
          <TextMessage content={message.textContent} />
        </div>

        <div className="message-content__bottom">
          <span className="message-content__bottom-send-time">
            <TimeAgo
              datetime={message.createdAt}
              locale="vi"
              live={false}
              opts={{ minInterval: 60 }}
            />
          </span>
        </div>
      </div>
    </div>
  )
}

const TextMessage = (props) => {
  const { content } = props

  return <p className="text-message">{content}</p>
}

const TextWithImagesMessage = (props) => {}

const LinkMessage = (props) => {}

export default Message
