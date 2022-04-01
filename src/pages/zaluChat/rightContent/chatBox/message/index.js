import React from 'react'
import { useSelector } from 'react-redux'
import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
import vi from 'timeago.js/lib/lang/vi'
import './message.scss'

timeago.register('vi', vi)

const Message = React.forwardRef((props, ref) => {
  const me = useSelector((state) => state.app.userInfo)
  const currentChat = useSelector((state) => state.conversations.currentChatBox)
  const { message } = props
  const isMe = me.id === message.senderId

  return (
    <div className={`message ${isMe ? 'me' : ''}`} ref={ref}>
      <div
        className="message-sender-avatar"
        style={{ backgroundImage: `url(${message?.sender?.avatar})` }}
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
})

const TextMessage = (props) => {
  const { content } = props

  return <p className="text-message">{content}</p>
}

const TextWithImagesMessage = (props) => {}

const LinkMessage = (props) => {}

export default Message
