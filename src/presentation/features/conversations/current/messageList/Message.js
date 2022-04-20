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
        {/* //messageType của nó là gì. Nếu là images thì ta sẽ
          //render một loạt các image... tùy theo kích cỡ
          //Nếu là text thông thường thì mình lưu bình thường. */}

        <div className="message-content__main">
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
          {/* {message.id === currentChat.lastMessageId ? (
            <span className="message-content__bottom-status">Đã gửi</span>
          ) : null} */}
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
