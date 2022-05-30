import React from 'react'
import { messageType } from 'utils/constants.js'

import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
import vi from 'timeago.js/lib/lang/vi'
timeago.register('vi', vi)

const Message = ({ message }) => {
  let msgContent = null
  if (message.messageType === messageType.IMAGE) {
    msgContent = (
      <TextWithImagesMessage
        images={message.images}
        desc={message.textContent}
      />
    )
  } else if (message.messageType === messageType.TEXT) {
    msgContent = <TextMessage content={message.textContent} />
  }

  return (
    <div className={`message ${message.isMe ? 'me' : ''}`}>
      <div
        className="message-sender-avatar"
        style={{ backgroundImage: `url(${message.senderAvatar})` }}
      ></div>
      <div className="message-content">
        <div className="message-content__main">{msgContent}</div>

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

const TextWithImagesMessage = (props) => {
  const { images, desc } = props

  return (
    <>
      <div className="images-gr">
        {images &&
          images.map((img) => {
            return <img key={img.id} alt="hinh anh" src={img.imageUrl} />
          })}
      </div>
      <p className="text-message">{desc}</p>
    </>
  )
}

const LinkMessage = (props) => {}

export default Message
